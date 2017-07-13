/*
	GameObjects Module
*/

function GameObject(cell, args) { 
	this.sprite = args.img;
	this.position = new Point(cell.center.x, cell.center.y);
	this.cell = cell;
	this.rotation = 0;
	this.triggers = [];
	this.triggersCounter = 0;
	this._type_ = GameObjectTypes.NONE;

	this.CreateTriggers(args.triggers);
}
GameObject.prototype = Object.create(BaseModel.prototype);

GameObject.prototype.CreateTriggers = function (triggers) {
	if (triggers === undefined) return;
	for (let i = 0; i < triggers.length; ++i)
		this.AddTrigger(new Trigger(this, triggers[i][0],
			triggers[i][1],
			triggers[i][2],
			triggers[i][3]));
};

GameObject.prototype.AddTrigger = function (trigger) {
	trigger.id = ++this.triggersCounter;
	this.triggers.push(trigger);
};

GameObject.prototype.RemoveTrigger = function (id) {
	for (let i = 0; i < this.triggers.length; ++i)
		if (this.triggers[i] === id) {
			delete this.triggers[i];
			this.triggers.splice(i, 1);
			break;
		}
};

GameObject.prototype.ActivateTriggers = function (object) {
	for (let i = 0; i < this.triggers.length; ++i)
		this.triggers[i].Activate(object);
};

GameObject.prototype.ClearTrigger = function () {
	for (let i = 0; i < this.triggers.length; ++i)
		delete this.triggers[i];
	this.triggers = [];
};

GameObject.prototype.GetType = function () {
	return this._type_;
};

GameObject.prototype.Collide = function (object, callback) {
	callback(InteractResult.NOTHING);
};

GameObject.prototype.Draw = function () {
	if (this.drawable !== undefined)
		this.drawable.Draw(this.position.x, this.position.y);
};

GameObject.prototype.Destroy = function () {
	this.cell.Clear();
};


/* STATIC */
function StaticObject(cell, args) {
	GameObject.call(this, cell, args);
	this._type_ = GameObjectTypes.STATIC;
}
StaticObject.prototype = Object.create(GameObject.prototype);

function Obstacle(cell, args) {
	StaticObject.call(this, cell, args);
}
Obstacle.prototype = Object.create(StaticObject.prototype);

function Wall(cell, args) {
	Obstacle.call(this, cell, args);
	this.cell.SetStyle(WallStyle, true);
	this._type_ = GameObjectTypes.WALL;
}
Wall.prototype = Object.create(Obstacle.prototype);

Wall.prototype.Draw = function () {
	// this.gm.render.DrawHex(this.position, 20, false, {fill: 'pink', edge: 'rgba(255, 255, 255, 0)'});
};

function Door(cell, args) { // drawable, triggers, status
	Obstacle.call(this, cell, args);
	this.status = args.status ? args.status : DoorState.CLOSED;

	if (this.status == DoorState.CLOSED)
		this.cell.SetStyle(DoorStyleClosed, true);
	else
		this.cell.SetStyle(DoorStyleOpened, true);
	this._type_ = GameObjectTypes.DOOR;
}
Door.prototype = Object.create(Obstacle.prototype);

Door.prototype.Draw = function () {
	// if (this.status == DoorState.CLOSED)
	// 	this.cell.SetStyle(DoorStyleClosed);
	// else
	// 	this.cell.SetStyle(DoorStyleOpened);
};

Door.prototype.Open = function () {
	this.cell.SetStyle(DoorStyleOpened, true);
	this.status = DoorState.OPENED;
};

Door.prototype.Collide = function (object, callback) {
	if (this.status === DoorState.CLOSED) {
		callback(InteractResult.NOTHING);
	} else {
		if ((object.GetType() === GameObjectTypes.PLAYER) || (object.GetType() === GameObjectTypes.ENEMY))
			callback(InteractResult.MOVED);
		else
			callback(InteractResult.NOTHING);
	}
};

function Container(cell, args) {
	Obstacle.call(this, cell, args);
	this.content = args.content;
}
Container.prototype = Object.create(Obstacle.prototype);

function Bonus(cell, args) {
	StaticObject.call(this, cell, args);
	this._type_ = GameObjectTypes.BONUS;
}
Bonus.prototype = Object.create(StaticObject.prototype);

function Exit(cell, args) {
	StaticObject.call(this, cell, args);
	this.cell.SetStyle(ExitStyle, true);
	this._type_ = GameObjectTypes.EXIT;
}
Exit.prototype = Object.create(StaticObject.prototype);

Exit.prototype.Draw = function () {
	// this.cell.SetStyle(ExitStyle);
};

Exit.prototype.Collide = function (object, callback) {
	if (object.GetType() === GameObjectTypes.PLAYER)
		callback(InteractResult.EXIT);
	else
		callback(InteractResult.MOVED);
};

/* DYNAMIC */
function DynamicObject(cell, args) {
	GameObject.call(this, cell, args);
	this._type_ = GameObjectTypes.DYNAMIC;
}

DynamicObject.prototype = Object.create(GameObject.prototype);

DynamicObject.prototype.MoveTo = function (cell) {
	let that = this;
	cell.Interact(this.cell, function (result) {
		that.rotation = that.cell.center.GetVector(cell.center).PolarAngle();
		switch (result) {
			case InteractResult.MOVED:
				that.cell.ClearNearby(NearbyCellStyle);
				that.cell.Clear();
				cell.MoveObject(that);
				// that.position = cell.center;
				that.gm.SetMode(GameState.ANIMATING);
				that.gm.animator.AddMotion(that, cell.center, 2, AnimatorModes.LINEAR, function ()
					{
						that.gm.ChangeScore(1);
					});

				that.cell = cell;
				setTimeout(function () {
					that.cell.FillNearby(NearbyCellStyle);
					that.gm.render.Clear(0);
					that.gm.grid.Draw();
				}, 250);
			break;

            case InteractResult.EXIT:
				that.cell.ClearNearby(NearbyCellStyle);
				that.rotation = that.cell.center.GetVector(cell.center).PolarAngle();
				that.gm.SetMode(GameState.ANIMATING);
				that.gm.animator.AddMotion(that, cell.center, 2, AnimatorModes.LINEAR, function ()
					{
						that.gm.scoreManager.ShowScore('Hello!\n');
            			console.log('Exit');
					});
            break;
		}
	});
};

function Cube(cell, args) {
	DynamicObject.call(this, cell, args);
	this._type_ = GameObjectTypes.CUBE;
}
Cube.prototype = Object.create(DynamicObject.prototype);

Cube.prototype.Collide = function (object, callback) {
	if ((object.GetType() === GameObjectTypes.PLAYER)) {
		callback(InteractResult.TAKE);
	} else {
		callback(InteractResult.NOTHING);
	}
};

function Actor(cell, args) {
	DynamicObject.call(this, cell, args);
	this.actionPoints = 0;
	this.inventory = [];

	if (this.sprite) {
		this.sprite.Animate(AnimationState.IDLE);
	}
}
Actor.prototype = Object.create(DynamicObject.prototype);

Actor.prototype.Draw = function () {
	// this.gm.render.DrawSprite(this.sprite, this.position.x, this.position.y, this.sprite.scale, false);
	if (this.sprite) {
		this.sprite.Draw(this.position.x, this.position.y, this.rotation);
	}
	else {
		this.gm.render.DrawCircle(this.position, 20, {fill: 'red', edge: 'rgba(255, 255, 255, 0)'});
	}
};

Actor.prototype.ChangeAnimationClip = function (clip) {
	if (this.sprite) {
		this.sprite.Animate(clip);
	}
};

function Player(cell, args) {
	Actor.call(this, cell, args);
	this._type_ = GameObjectTypes.PLAYER;
	this.gm.AddPlayer(this);
	cell.FillNearby(NearbyCellStyle);
}
Player.prototype = Object.create(Actor.prototype);

Player.prototype.Collide = function (object, callback) {
	if (object.GetType() === GameObjectTypes.ENEMY) {
		callback(InteractResult.ATTACK);
	} else {
		callback(InteractResult.NOTHING);
	}
};

function Enemy(cell, args) { // drawable, triggers, radius
	Actor.call(this, cell, args);
	this._type_ = GameObjectTypes.ENEMY;
	this.path_guard = [];
	this.path_haunt = null;
	this.status = EnemyBehavior.GUARD;
	this.vision_radius = args.radius ? args.radius : 1;
}
Enemy.prototype = Object.create(Actor.prototype);

Enemy.prototype.Collide = function (object, callback) {
	if (object.GetType() === GameObjectTypes.PLAYER) {
		callback(InteractResult.ATTACK);
	} else {
		callback(InteractResult.NOTHING);
	}
};

Enemy.prototype.GetPathTo = function (cell) {
	return this.cell.ShortestWay(cell);
};

Enemy.prototype.Live = function () {
	let target = this.Search();
	if (target !== null) {
		this.status = EnemyBehavior.HAUNT;
	}

	// switch (this.status) {

	// }
	
	if (!this.path_guard.isEmpty()) {
		this.MoveTo(this.path_guard.NextTurn);
	}
};

Enemy.prototype.Search = function (target = GameObjectTypes.PLAYER) {
	let area = [];

	for (let i = 1; i <= this.vision_radius; ++i) {
		area = this.cell.GetRing(i);
		for (let j = 0; j < area.length; ++j)
			if (!area[j].isEmpty())
				if (area[j].object.GetType() === target)
					return area[j];
	}
	return null;
};
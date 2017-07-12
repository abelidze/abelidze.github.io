/*
 	GameObjects Module
*/

function GameObject(cell) {
	this.cell = cell;
	this.rotation = 0;
	this.triggers = [];
	this._type_ = GameObjectTypes.NONE;
}

GameObject.prototype.AddTrigger = function (trigger) {
    this.triggers.push(trigger);
};

GameObject.prototype.ActivateTriggers = function () {
    for (let i = 0; i < this.triggers.length; ++i)
        this.triggers[i].Activate(this);
}

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
	//do nothing
};

GameObject.prototype.Destroy = function () {
	this.cell.Clear();
};


/* STATIC */
function StaticObject(cell, sprite) {
	GameObject.call(this, cell);
	this.sprite = sprite;
	this._type_ = GameObjectTypes.STATIC;
}
StaticObject.prototype = Object.create(GameObject.prototype);

function Obstacle(cell, sprite) {
	StaticObject.call(this, cell, sprite);
}
Obstacle.prototype = Object.create(StaticObject.prototype);

function Wall(cell, sprite) {
	Obstacle.call(this, cell, sprite);
	this._type_ = GameObjectTypes.WALL;
}
Wall.prototype = Object.create(Obstacle.prototype);

function Door(cell, sprite, status) {
	Obstacle.call(this, cell, sprite);
	this.status = status;
	this._type_ = GameObjectTypes.DOOR;
}
Door.prototype = Object.create(Obstacle.prototype);

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

function Container(cell, sprite, content) {
	Obstacle.call(this, cell, sprite, sprite);
	this.content = content;
}
Container.prototype = Object.create(Obstacle.prototype);

function Entry(cell, sprite) {
	StaticObject.call(this, cell, sprite);
	this._type_ = GameObjectTypes.ENTRY;
}
Entry.prototype = Object.create(StaticObject.prototype);

function Exit(cell, sprite) {
	StaticObject.call(this, cell, sprite);
	this._type_ = GameObjectTypes.EXIT;
}
Exit.prototype = Object.create(StaticObject.prototype);

/* DYNAMIC */
function DynamicObject(cell) {
	GameObject.call(this, cell);
	this._type_ = GameObjectTypes.DYNAMIC;
}
DynamicObject.prototype = Object.create(GameObject.prototype);

DynamicObject.prototype.MoveTo = function (cell) {
	let that = this;
	cell.Interact(this.cell, function (result) {
		switch (result) {
			case InteractResult.MOVED:
				that.rotation = that.cell.center.GetVector(cell.center).PolarAngle();
				that.cell.Clear();
				cell.MoveObject(that);
				// that.position = cell.center;
				that.gm.gameState = GameState.ANIMATING;
				that.gm.animator.AddMotion(that, cell.center, 2, AnimatorModes.LINEAR);
				that.cell = cell;
				break;
		}
	});
};

function Cube(cell, sprite) {
	DynamicObject.call(this, cell);
	this.sprite = sprite;
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

function Actor(cell, anim) {
	DynamicObject.call(this, cell);
	this.position = new Point(cell.center.x, cell.center.y);
	this.anim = anim;
	this.animationClip = AnimationState.IDLE;
	this.actionPoints = 0;
	this.inventory = [];

	if (this.anim) {
		this.anim[0].Play();
	}
}
Actor.prototype = Object.create(DynamicObject.prototype);

Actor.prototype.Draw = function () {
	// this.gm.render.DrawSprite(this.sprite, this.position.x, this.position.y, this.sprite.scale, false);
	if (this.anim) {
		let ani = this.anim[this.animationClip];
		ani.Draw(this.position.x, this.position.y, 1, this.rotation, true);
	}
	else {
		this.gm.render.DrawCircle(this.position, 20, false, {fill: 'red', edge: 'rgba(255, 255, 255, 0)'});
	}
};

Actor.prototype.ChangeAnimationClip = function (clip) {
	if (this.anim) {
		this.anim[this.animationClip].Stop();
		this.anim[clip].Play();
		this.animationClip = clip;
	}
};

function Player(cell, anim) {
	Actor.call(this, cell, anim);
	this._type_ = GameObjectTypes.PLAYER;
	this.gm.AddPlayer(this);
}
Player.prototype = Object.create(Actor.prototype);

Player.prototype.Collide = function (object, callback) {
	if (object.GetType() === GameObjectTypes.ENEMY) {
		callback(InteractResult.ATTACK);
	} else {
		callback(InteractResult.NOTHING);
	}
};

function Enemy(cell, anim) {
	Actor.call(this, cell, anim);
	this._type_ = GameObjectTypes.ENEMY;
}
Enemy.prototype = Object.create(Actor.prototype);

Enemy.prototype.Collide = function (object, callback) {
	if (object.GetType() === GameObjectTypes.PLAYER) {
		callback(InteractResult.ATTACK);
	} else {
		callback(InteractResult.NOTHING);
	}
};
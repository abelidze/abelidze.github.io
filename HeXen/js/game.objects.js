/*
 	GameObjects Module
*/

function GameObject(cell, drawable) {
    this.sprite = drawable;
    this.position = new Point(cell.center.x, cell.center.y);
	this.cell = cell;
	this.rotation = 0;
	this.triggers = [];
	this._type_ = GameObjectTypes.NONE;
}

GameObject.prototype = Object.create(BaseModel.prototype);

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
    if (this.drawable !== undefined)
	    this.drawable.Draw(this.position.x, this.position.y);
};

GameObject.prototype.Destroy = function () {
	this.cell.Clear();
};


/* STATIC */
function StaticObject(cell, drawable) {
	GameObject.call(this, cell, drawable);
	this._type_ = GameObjectTypes.STATIC;
}
StaticObject.prototype = Object.create(GameObject.prototype);

function Obstacle(cell, drawable) {
	StaticObject.call(this, cell, drawable);
}
Obstacle.prototype = Object.create(StaticObject.prototype);

function Wall(cell, drawable) {
	Obstacle.call(this, cell, drawable);
	this._type_ = GameObjectTypes.WALL;
}
Wall.prototype = Object.create(Obstacle.prototype);

Wall.prototype.Draw = function () {
    this.cell.SetStyle(WallStyle);
}

function Door(cell, drawable, status) {
	Obstacle.call(this, cell, drawable);
	this.status = status ? status : DoorState.CLOSED;
	this._type_ = GameObjectTypes.DOOR;
}
Door.prototype = Object.create(Obstacle.prototype);

Door.prototype.Draw = function () {
    this.cell.SetStyle(DoorStyle);
}

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

function Container(cell, drawable, content) {
	Obstacle.call(this, cell, drawable);
	this.content = content;
}
Container.prototype = Object.create(Obstacle.prototype);

function Entry(cell, drawable) {
	StaticObject.call(this, cell, drawable);
	this._type_ = GameObjectTypes.ENTRY;
}
Entry.prototype = Object.create(StaticObject.prototype);

function Exit(cell, drawable) {
	StaticObject.call(this, cell, drawable);
	this._type_ = GameObjectTypes.EXIT;
}
Exit.prototype = Object.create(StaticObject.prototype);

Exit.prototype.Draw = function () {
    this.cell.SetStyle(ExitStyle);
}

Exit.prototype.Collide = function (object, callback) {
    if (object.GetType() === GameObjectTypes.PLAYER)
        callback(InteractResult.EXIT);
    else
        callback(InteractResult.MOVED);
}

/* DYNAMIC */
function DynamicObject(cell, drawable) {
	GameObject.call(this, cell, drawable);
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
            case InteractResult.EXIT:
                let victory = new SplashWindow('<a href="http://niceme.me">TAP ME, SENPAI</a>');
                victory.Show();
                break;
		}
	});
};

function Cube(cell, drawable) {
	DynamicObject.call(this, cell, drawable);
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

function Actor(cell, drawable) {
	DynamicObject.call(this, cell, drawable);
	this.animationClip = AnimationState.IDLE;
	this.actionPoints = 0;
	this.inventory = [];

	if (this.sprite) {
		this.sprite[0].Play();
	}
}
Actor.prototype = Object.create(DynamicObject.prototype);

Actor.prototype.Draw = function () {
	// this.gm.render.DrawSprite(this.sprite, this.position.x, this.position.y, this.sprite.scale, false);
	if (this.sprite) {
		let ani = this.sprite[this.animationClip];
		ani.Draw(this.animationClip, this.position.x, this.position.y, this.rotation);
	}
	else {
		this.gm.render.DrawCircle(this.position, 20, false, {fill: 'red', edge: 'rgba(255, 255, 255, 0)'});
	}
};

Actor.prototype.ChangeAnimationClip = function (clip) {
	if (this.sprite) {
		this.sprite[this.animationClip].Stop();
		this.sprite[clip].Play();
		this.animationClip = clip;
	}
};

function Player(cell, drawable) {
	Actor.call(this, cell, drawable);
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

function Enemy(cell, drawable) {
	Actor.call(this, cell, drawable);
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
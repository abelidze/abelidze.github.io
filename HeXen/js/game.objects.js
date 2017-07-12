/*
 	GameObjects Module
*/

function GameObject(cell, drawable) {
    this.sprite =
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

Wall.prototype.Draw = function () {
    this.cell.SetStyle(WallStyle);
    //this.gm.render.DrawCircle(this.position, 20, false, {fill: 'pink', edge: 'rgba(255, 255, 255, 0)'});
}

function Door(cell, sprite, status) {
	Obstacle.call(this, cell, sprite);
	this.status = status ? status : DoorState.CLOSED;
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

Exit.prototype.Collide = function (object, callback) {
    if (object.GetType() === GameObjectTypes.PLAYER)
        callback(InteractResult.EXIT);
    else
        callback(InteractResult.MOVED);
}

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
            case InteractResult.EXIT:
                let victory = new SplashWindow('<a href="http://niceme.me">TAP ME, SENPAI</a>');
                victory.Show();
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

function Actor(cell, sprite) {
	DynamicObject.call(this, cell);
	this.sprite = sprite;
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

function Player(cell, sprite) {
	Actor.call(this, cell, sprite);
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

function Enemy(cell, sprite) {
	Actor.call(this, cell, sprite);
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
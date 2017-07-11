/*
	GameObjects Module 
*/

function GameObject(cell) {
	this.cell = cell;
    this.rotation = 0;
    this._type_ = ObjectTypes.NONE;
}

GameObject.prototype.GetType = function(object, callback) {
    //do smth
};

GameObject.prototype.Collide = function(object, callback) {
  //do smth
};

GameObject.prototype.Destroy = function() {
	this.cell.Clear();
};


/* STATIC */
function StaticObject(cell) {
    GameObject.call(this, cell);
    this._type_ = ObjectTypes.STATIC;
}
StaticObject.prototype = Object.create(GameObject.prototype);

function Trigger(cell) {
    StaticObject.call(this, cell);
    this.action = null;

}
Trigger.prototype = Object.create(StaticObject.prototype);

function Obstacle(cell, sprite) {
	StaticObject.call(this, cell);
	this.sprite = sprite;
}
Obstacle.prototype = Object.create(StaticObject.prototype);

function Wall(cell, sprite) {
    Obstacle.call(this, cell, sprite);
}
Wall.prototype = Object.create(Obstacle.prototype);

function Door(cell, sprite) {
    Obstacle.call(this, cell, sprite);
    this.status = DoorState.CLOSED;
}
Door.prototype = Object.create(Obstacle.prototype);

function Container(cell, sprite, content) {
    Obstacle.call(this, cell, sprite, sprite);
    this.content = content;
}
Container.prototype = Object.create(Obstacle.prototype);

/* DYNAMIC */
function DynamicObject(cell) {
    GameObject.call(this, cell);
}
DynamicObject.prototype = Object.create(GameObject.prototype);

DynamicObject.prototype.MoveTo = function(cell) {
	let that = this;
	cell.Interact(this.cell, function(result) {
		if(result === InteractResult.MOVED) {
			that.cell.Clear();
			cell.AddObject(that);
		}
	});
};

function Actor(sprite, cell) {
    DynamicObject.call(this, cell);
	this.sprite = sprite;
	this.actionPoints = 0;
	this.inventory = [];
	// this.cell = cell;
}
Actor.prototype = Object.create(DynamicObject.prototype);

function Player(cell, sprite) {
    Actor.call(this, sprite, cell);
}
Player.prototype = Object.create(Actor.prototype);

function Enemy(cell, sprite) {
    Actor.call(this, sprite, cell);
}
Enemy.prototype = Object.create(Actor.prototype);
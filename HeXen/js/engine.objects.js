/*
	GameObjects Module 
*/
"use strict";

function GameObject(cell) {
	this.cell = cell;
    this.rotation = 0;
}

GameObject.prototype.Collide = function(object, callback) {
	// Do Stuff
};

GameObject.prototype.Destroy = function() {
	this.cell.Clear();
};


/* STATIC */
function StaticObject(cell) {
    GameObject.call(this, cell);
}
StaticObject.prototype = Object.create(GameObject.prototype);

function Trigger(cell) {
    StaticObject.call(this, cell);

}
Trigger.prototype = Object.create(StaticObject.prototype);

function Obstacle(cell) {
	StaticObject.call(this, cell);
}
Obstacle.prototype = Object.create(StaticObject.prototype);

function Wall(cell) {
    Obstacle.call(this, cell);
}
Wall.prototype = Object.create(Obstacle.prototype);

function Door(cell) {
    Obstacle.call(this, cell);
    this.status = DoorState.CLOSED;
}
Door.prototype = Object.create(Obstacle.prototype);

/* DYNAMIC */
function DynamicObject(cell) {
    DynamicObject.call(this, cell);
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
	// this.cell = cell;
}
Actor.prototype = Object.create(DynamicObject.prototype);

function Player(sprite, cell) {
    Actor.call(this, sprite, cell);
	// this.sprite = sprite;
	// this.cell = cell;
}
Player.prototype = Object.create(Actor.prototype);

function Enemy(sprite, cell) {
    Actor.call(this, sprite, cell);
	// this.sprite = sprite;
	// this.cell = cell;
}
Enemy.prototype = Object.create(Actor.prototype);
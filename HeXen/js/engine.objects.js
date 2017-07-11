/*
	GameObjects Module 
*/

function GameObject() {
	this.cell = null;
}

GameObject.prototype.Collide = function(object, callback) {
	// Do Stuff
}

GameObject.prototype.Destroy = function() {
	this.cell.Clear();
}


/* STATIC */
function StaticObject() {

}
StaticObject.prototype = Object.create(GameObject.prototype);

function Obstacle(cell) {
	// Properties
}
Obstacle.prototype = Object.create(StaticObject.prototype);


/* DYNAMIC */
function DynamicObject() {
	this.cell = null;
}
DynamicObject.prototype = Object.create(GameObject.prototype);

DynamicObject.prototype.MoveTo = function(cell) {
	let that = this;
	cell.Interact(this.cell, function(result) {
		if(result == InteractResult.MOVED) {
			that.cell.Clear();
			cell.AddObject(that);
		}
	});
}

function Actor(sprite, cell) {
	this.sprite = sprite;
	this.cell = cell;
}
Actor.prototype = Object.create(DynamicObject.prototype);

function Player(sprite, cell) {
	this.sprite = sprite;
	this.cell = cell;
}
Player.prototype = Object.create(Actor.prototype);

function Enemy(sprite, cell) {
	this.sprite = sprite;
	this.cell = cell;
}
Enemy.prototype = Object.create(Actor.prototype);
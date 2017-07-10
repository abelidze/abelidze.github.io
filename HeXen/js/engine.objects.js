/*
	GameObjects Module 
*/

function GameObject(gmanager) {
	this.gm = gmanager;
}

/* STATIC */
function StaticObject() {
	this.cell = null;
}
StaticObject.prototype = Object.create(GameObject.prototype);

function Obstacle() {
	// Properties
}
Obstacle.prototype = Object.create(StaticObject.prototype);


/* DYNAMIC */
function DynamicObject() {
	this.cell = null;
}
DynamicObject.prototype = Object.create(GameObject.prototype);
DynamicObject.prototype.MoveTo = dummyFunc;

function Actor() {
	// Properties
}
Actor.prototype = Object.create(DynamicObject.prototype);

function Player() {
	// Properties
}
Player.prototype = Object.create(Actor.prototype);

function Enemy() {
	// Properties
}
Enemy.prototype = Object.create(Actor.prototype);
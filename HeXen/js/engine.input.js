/*
	Input Module
*/

function Mouse(gmanager) {
	this.gm = gmanager;
	this.posX = 0;
	this.posY = 0;
	this.isMoving = false;

	document.addEventListener('mousemove', this.Move.bind(this), false);
	document.addEventListener('mouseup',   this.Up.bind(this),   false);
	document.addEventListener('mousedown', this.Down.bind(this), false);

	// document.addEventListener('touchmove', this.movetouch, false);
	// document.addEventListener('touchend',  this.uptouch,   false);
	// document.addEventListener('touchstart',this.downtouch, false);
}

Mouse.prototype.Move = function(event) {
	this.UpdateCoords(event);
	// if(selectedPoint != undefined) field.movePoint();
}

Mouse.prototype.Up = function(event) {
	this.isMoving = false;
	// selectedPoint = undefined;
	// if(!intersectionPoints.length)
	// 	field.changeLevel(1);
}

Mouse.prototype.Down = function(event) {
	this.isMoving = true;
	this.UpdateCoords(event);
	this.gm.grid.Select(this.posX, this.posY);
	// if(selectedPoint != undefined)
	// {
	// 	console.log(selectedPoint);
	// 	field.movePoint();
	// }
}

Mouse.prototype.UpdateCoords = function(event) {
	let canvas = this.gm.render.GetCanvas();
	this.posX = event.pageX - canvas.offsetLeft;
	this.posY = event.pageY - canvas.offsetTop;

	if(this.posX > canvas.width - ClickRadius) this.posX = canvas.width - ClickRadius;
	else if(this.posX < ClickRadius) this.posX = ClickRadius;

	if(this.posY > canvas.height - ClickRadius) this.posY = canvas.height - ClickRadius;
	else if(this.posY < ClickRadius) this.posY = ClickRadius;
}

// Mouse.prototype.uptouch = function(event) {
// 	this.isMoving = false;
// 	selectedPoint = undefined;
// 	if (!intersectionPoints.length)
// 		field.changeLevel(1);
// }

// Mouse.prototype.movetouch = function(event) {
// 	mouse.getCoords2(event);
// 	if (selectedPoint != undefined) field.movePoint();
// }

// Mouse.prototype.downtouch = function(event) {
// 	isMoving = true;
// 	mouse.getCoords2(event);
// 	field.selectPoint();
// 	if(selectedPoint != undefined)
// 	{
// 		console.log(selectedPoint);
// 		field.movePoint();
// 	}
// }

// Mouse.prototype.getCoords2 = function(event) {
// 	if (points[0] == null) return;
// 	cursorPosX = event.changedTouches[0].pageX - canvas.offsetLeft;
// 	cursorPosY = event.changedTouches[0].pageY - canvas.offsetTop;
// 	if (cursorPosX > fieldWidth - radius) cursorPosX = fieldWidth - radius;
// 	else if (cursorPosX < radius) cursorPosX = radius;
// 	if (cursorPosY > fieldHeight - radius) cursorPosY = fieldHeight - radius;
// 	else if (cursorPosY < radius) cursorPosY = radius;
// }
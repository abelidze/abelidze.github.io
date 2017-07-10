/*
	Input Module
*/

function Mouse() {

}

Mouse.prototype.uptouch = function(event) {
	isMoving = false;
	selectedPoint = undefined;
	if (!intersectionPoints.length)
	field.changeLevel(1);
}

Mouse.prototype.movetouch = function(event) {
	mouse.getCoords2(event);
	if (selectedPoint != undefined) field.movePoint();
}

Mouse.prototype.downtouch = function(event) {
	isMoving = true;
	mouse.getCoords2(event);
	field.selectPoint();
	if(selectedPoint != undefined)
	{
		console.log(selectedPoint);
		field.movePoint();
	}
}

Mouse.prototype.move = function(event) {
	mouse.getCoords(event);
	if (selectedPoint != undefined) field.movePoint();
}

Mouse.prototype.down = function(event) {
	isMoving = true;
	mouse.getCoords(event);
	field.selectPoint();
	if(selectedPoint != undefined)
	{
		console.log(selectedPoint);
		field.movePoint();
	}
}

Mouse.prototype.up = function(event) {
	isMoving = false;
	selectedPoint = undefined;
	if (!intersectionPoints.length)
	field.changeLevel(1);
}

Mouse.prototype.getCoords = function(event) {
	if (points[0] == null) return;
	cursorPosX = event.pageX - canvas.offsetLeft;
	cursorPosY = event.pageY - canvas.offsetTop;
	if (cursorPosX > fieldWidth - radius) cursorPosX = fieldWidth - radius;
	else if (cursorPosX < radius) cursorPosX = radius;
	if (cursorPosY > fieldHeight - radius) cursorPosY = fieldHeight - radius;
	else if (cursorPosY < radius) cursorPosY = radius;
}

Mouse.prototype.getCoords2 = function(event) {
	if (points[0] == null) return;
	cursorPosX = event.changedTouches[0].pageX - canvas.offsetLeft;
	cursorPosY = event.changedTouches[0].pageY - canvas.offsetTop;
	if (cursorPosX > fieldWidth - radius) cursorPosX = fieldWidth - radius;
	else if (cursorPosX < radius) cursorPosX = radius;
	if (cursorPosY > fieldHeight - radius) cursorPosY = fieldHeight - radius;
	else if (cursorPosY < radius) cursorPosY = radius;
}
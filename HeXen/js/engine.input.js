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

	document.addEventListener('touchmove', this.MoveTouch.bind(this), false);
	document.addEventListener('touchend',  this.UpTouch.bind(this),   false);
	document.addEventListener('touchstart',this.DownTouch.bind(this), false);
}

Mouse.prototype.Move = function(event) {
	this.UpdateCoords(event);
}

Mouse.prototype.Up = function(event) {
	this.isMoving = false;
}

Mouse.prototype.Down = function(event) {
	this.isMoving = true;
	this.UpdateCoords(event);
	this.gm.MouseEvent(event);
}

Mouse.prototype.MoveTouch = function(event) {
	this.UpdateCoordsTouch(event, true);
}

Mouse.prototype.UpTouch = function(event) {
	this.isMoving = false;
}

Mouse.prototype.DownTouch = function(event) {
	this.isMoving = true;
	this.UpdateCoords(event, true);
	this.gm.grid.Select(this.posX, this.posY);
}


Mouse.prototype.UpdateCoords = function(event, isTouch) {
	let canvas = this.gm.render.GetCanvas();
	if(isTouch === true) {
		this.posX = event.changedTouches[0].pageX - canvas.offsetLeft;
		this.posY = event.changedTouches[0].pageY - canvas.offsetTop;
	}
	else {
		this.posX = event.pageX - canvas.offsetLeft;
		this.posY = event.pageY - canvas.offsetTop;
	}

	if(this.posX > canvas.width - ClickRadius) this.posX = canvas.width - ClickRadius;
	else if(this.posX < ClickRadius) this.posX = ClickRadius;

	if(this.posY > canvas.height - ClickRadius) this.posY = canvas.height - ClickRadius;
	else if(this.posY < ClickRadius) this.posY = ClickRadius;
}
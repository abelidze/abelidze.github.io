/*
	GUI Interface Classes and functions
*/

function Clickable (rect) {
	this.rect = rect;
}

Clickable.prototype.isPressed = function (x, y) {
	if (this.isInArea(x, y) && this.mouse.isMoving)
		return true;
	else
		return false;
}

function Button (onClick, rect, options) {
    this.onClick = onClick;
	Clickable.call(this, rect);
	this.options = options;
}

Button.prototype = Object.create(Clickable.prototype);

Button.prototype.Draw = function (onBack) {
	this.gm.render.DrawRectangle(this.rect, onBack, this.options);
}


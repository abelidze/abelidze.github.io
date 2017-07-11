/*
	All Draw Events and functions
*/

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Rect(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

Rect.prototype.isInArea = function (x, y) {
	if (this.x < x && x < (this.x + this.w) &&
		this.y < y && y < (this.y + this.h))
		return true;
	else
		return false;
}

function Drawable(scale) {
	if(scale === undefined) scale = 1;
	this.scale = scale;
}

function Sprite(image, scale) {
	Drawable.call(this, scale);
	this.img = image;
}
Sprite.prototype = Object.create(Drawable.prototype);

Sprite.prototype.Draw = function(x, y) {

}

function Animation() {
	// Future
}
Animation.prototype = Object.create(Drawable.prototype);

function Animator() {
	// Future
}
Animator.prototype = Object.create(Drawable.prototype);


function Render() {
	this.lastRender = 0;

	this.fgcanvas = document.getElementById('game');
	this.fgcanvas.width = window.innerWidth;// window.outerWidth;
	this.fgcanvas.height = window.innerHeight;
	this.cnt_fg = this.fgcanvas.getContext('2d');
	// this.cnt_fg.fillStyle = 'rgba(0, 255, 0, 0.3)';

	this.bgcanvas = document.createElement('canvas');
	this.bgcanvas.id = 'field';
	this.bgcanvas.width = window.innerWidth;
	this.bgcanvas.height = window.innerHeight;
	this.cnt_bg = this.bgcanvas.getContext('2d');
	document.body.appendChild(this.bgcanvas);
}

Render.prototype.Clear = function() {
	this.cnt_fg.clearRect(0, 0, this.fgcanvas.width, this.fgcanvas.height);
}

Render.prototype.ClearBack = function() {
	this.cnt_bg.clearRect(0, 0, this.bgcanvas.width, this.bgcanvas.height);
}

Render.prototype.GetCanvas = function() {
	return this.fgcanvas;
}

Render.prototype.deltaTime = function() {
	let currentDate = new Date();
	let dTime = currentDate - this.lastRender;
	if(this.lastRender === 0) dTime = 0;
	this.lastRender = currentDate;
	return dTime;
}

Render.prototype.DrawPath = function(points, onBack, effect) {
	if(points.length <= 1)
		return;
	let context = (onBack === true ? this.cnt_bg : this.cnt_fg);

	context.beginPath();
	context.moveTo(Math.floor(points[0].x), Math.floor(points[0].y));
	for (let i = 1; i < points.length; ++i) {
		context.lineTo(Math.floor(points[i].x), Math.floor(points[i].y));
	}
	context.closePath();

	context.lineWidth = (effect.width !== undefined ? effect.width : 1);
	context.strokeStyle = (effect.edge !== undefined ? effect.edge : 'black');
	context.stroke();

	if(effect.fill !== undefined) {
		context.fillStyle = effect.fill;
		context.fill();
	}
}

Render.prototype.DrawHex = function(center, radius, onBack, effect) {
	let hexagon = [];
	for(let i = 0; i < 6; ++i) {
		let angle_deg = 60*i + 30;
		let angle_rad = Math.PI / 180 * angle_deg;
		hexagon.push({
						x: center.x + radius * Math.cos(angle_rad),
						y: center.y + radius * Math.sin(angle_rad)
					 });
	}
	this.DrawPath(hexagon, effect, onBack);
}

Render.prototype.DrawLine = function(point1, point2, onBack, effect) {
	this.DrawPath([point1, point2], effect, onBack);
}

Render.prototype.DrawCircle = function(center, radius, onBack, effect) {
	let context = (onBack === true ? this.cnt_bg : this.cnt_fg);

	context.beginPath();
	context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);

	context.lineWidth = (effect.width !== undefined ? effect.width : 1);
	context.strokeStyle = (effect.edge !== undefined ? effect.edge : 'black');
	context.stroke();

	if(effect.fill !== undefined) {
		context.fillStyle = effect.fill;
		context.fill();
	}
}

Render.prototype.DrawRectangle = function(rect, onBack, effect) {
	let context = (onBack === true ? this.cnt_bg : this.cnt_fg);

	context.beginPath();
	context.rect(rect.x, rect.y, rect.w, rect.h);

	context.lineWidth = (effect.width !== undefined ? effect.width : 1);
	context.strokeStyle = (effect.edge !== undefined ? effect.edge : 'black');
	context.stroke();

	if(effect.fill !== undefined) {
		context.fillStyle = effect.fill;
		context.fill();
	}
}
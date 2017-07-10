/*
	All Draw Events and functions
*/

function Point(x, y) {
	this.x = x;
	this.y = y;
}

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

	if(effect.width !== undefined) {
		context.lineWidth = effect.width;
	} 

	if(effect.edge !== undefined) {
		context.strokeStyle = effect.edge;
	}
	context.stroke();

	if(effect.fill !== undefined) {
		context.fillStyle = effect.fill;
		context.fill();
	}
}

Render.prototype.DrawHex = function(center, r, onBack, effect) {
	let hexagon = [];
	for(let i = 0; i < 6; ++i) {
		let angle_deg = 60*i + 30;
		let angle_rad = Math.PI / 180 * angle_deg;
		hexagon.push({x: center.x + r*Math.cos(angle_rad),
			y: center.y + r*Math.sin(angle_rad)});
	}
	this.DrawPath(hexagon, effect, onBack);
}

Render.prototype.DrawCircle = dummyFunc;
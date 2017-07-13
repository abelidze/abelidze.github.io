/*
	All Draw Events and functions
*/

function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.Distance = function (point) {
	return Math.sqrt(sqr(this.x - point.x) + sqr(this.y - point.y));
}

Point.prototype.GetVector = function (point) {
	return new Point(point.x - this.x, point.y - this.y);
}

Point.prototype.PolarAngle = function () {
	return Math.atan2(this.y, this.x) - Math.PI / 2;
}

Point.prototype.Sign = function () {
	return Math.sign(this.x + this.y);
}

Point.prototype.Length = function () {
	return Math.sqrt(sqr(this.x) + sqr(this.y));
}

Point.prototype.Dot = function (point) {
	return (this.x * point.x + this.y * point.y);
}

Point.prototype.Normalize = function () {
	let len = this.Length();
	this.x /= len;
	this.y /= len;
	return this;
}

Point.prototype.isInTriangle = function (p1, p2, p3) {
	let vA = this.GetVector(p1).Normalize();
	let vB = this.GetVector(p2).Normalize();
	let vC = this.GetVector(p3).Normalize();

	let a1 = vA.Dot(vB);
	let a2 = vB.Dot(vC);
	let a3 = vC.Dot(vA);

	return (Math.abs((Math.acos(a1) + Math.acos(a2) + Math.acos(a3)) - 2 * Math.PI) < EPS);
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


function Drawable(source, scale) {
	if (scale === undefined) scale = 1;
	this.scale = scale;
	this.render_element = source;
	this._type_ = DrawableType.IMAGE;
}

Drawable.prototype = Object.create(BaseModel.prototype);

Drawable.prototype.Draw = function (x, y, onBack) {
	this.gm.render.DrawSprite(this.render_element, x, y, this.scale, onBack);
}

function Sprite(source, scale) {
	Drawable.call(this, source, scale);
	this.onCenter = true;
	this.animation_clip = 0;
}

Sprite.prototype = Object.create(Drawable.prototype);

Sprite.prototype.Draw = function (x, y,  rotation, onBack) {
	this.render_element[this.animation_clip].Draw(x, y, rotation, this.scale, this.onCenter, onBack);
}

Sprite.prototype.Animate = function (animation_clip) {
	this.render_element[this.animation_clip].Stop();
	this.animation_clip = animation_clip;
	this.render_element[this.animation_clip].Play();
}

function Animation(frames_img, frames_count, offsetX, offsetY, width, height, fps) {
	this.frames_img = frames_img;
	this.frames_count = frames_count;
	this.offset_x = offsetX;
	this.offset_y = offsetY;
	this.w = width;
	this.h = height;
	this.cur_frame = 0;
	this.fps = fps;
	this.timer = 0;
	this.interval = null;
	this.isPlayed = false;
}
Animation.prototype = Object.create(Drawable.prototype);

Animation.prototype.Draw = function (x, y, rotation, scale, onCenter, onBack) {
	if (!this.isPlayed)
		return;

	this.timer++;
	if (this.timer > this.fps) {
		this.timer = 0;
		this.cur_frame++;
		if (this.cur_frame >= this.frames_count)
			this.cur_frame = 0;
	}
	this.gm.render.DrawFrame(this, x, y, scale, rotation, onCenter, onBack);
}

Animation.prototype.Play = function () {
	this.isPlayed = true;
}

Animation.prototype.Stop = function () {
	if (!this.isPlayed)
		return;
	this.isPlayed = false;
}

Animation.prototype.Toggle = function () {
	this.isPlayed = !this.isPlayed;
}


function Animator() {
	this.motion = [];
}
Animator.prototype = Object.create(Drawable.prototype);

Animator.prototype.AddMotion = function (object, target, speed, mode, callback) {
	if (object.sprite) {
		object.ChangeAnimationClip(AnimationState.MOVE);
	}
	let dir = object.position.GetVector(target);
	let sgn = dir.Sign();
	this.motion.push([speed, object, target, mode, dir, sgn, callback]);
}

Animator.prototype.ProcessMotions = function(dTime) {
	let dir, cur_dir;
	for(let i = 0; i < this.motion.length; ++i) {
		cur_dir = this.motion[i][1].position.GetVector(this.motion[i][2]);
		if(cur_dir.Sign() != this.motion[i][5]) {
			if(this.motion[i][1].sprite) {
				this.motion[i][1].ChangeAnimationClip(AnimationState.IDLE);
			}
			// Callback
			if(this.motion[i][6] !== undefined)
				this.motion[i][6]();

			this.motion[i][1].position.x = this.motion[i][2].x;
			this.motion[i][1].position.y = this.motion[i][2].y;
			this.motion.splice(i, 1);
			i--;
			continue;
		}

		switch(this.motion[i][3]) {
			case AnimatorModes.EASE:
				dir = cur_dir; break;
			case AnimatorModes.LINEAR:
				dir = this.motion[i][4]; break;
		}
		this.motion[i][1].position.x += dir.x * dTime / 1000 * this.motion[i][0];
		this.motion[i][1].position.y += dir.y * dTime / 1000 * this.motion[i][0];
	}
	if (this.motion.length == 0 && this.gm.gameState === GameState.ANIMATING) {
		this.gm.gameState = GameState.TURN;
	}
}


function Render() {
	this.lastRender = 0;

	this.fgcanvas = document.createElement('canvas');
	this.fgcanvas.id = 'layer1';
	this.cnt_fg = this.fgcanvas.getContext('2d');
	document.body.appendChild(this.fgcanvas);

	this.bgcanvas = document.createElement('canvas');
	this.bgcanvas.id = 'layer2';
	this.cnt_bg = this.bgcanvas.getContext('2d');
	document.body.appendChild(this.bgcanvas);

	this.scale = 1;
	this.content_width = window.innerWidth;
	this.content_height = window.innerHeight;
	this.ResizeCanvas();
	this.gm.event.AddEvent('resize', this.gm.ResizeEvent.bind(this.gm));
}
Render.prototype = Object.create(BaseModel.prototype);

Render.prototype.Clear = function () {
	this.cnt_fg.clearRect(0, 0, this.fgcanvas.width, this.fgcanvas.height);
}

Render.prototype.ClearBack = function () {
	this.cnt_bg.clearRect(0, 0, this.bgcanvas.width, this.bgcanvas.height);
}

Render.prototype.GetCanvas = function () {
	return this.fgcanvas;
}

Render.prototype.UpdateScale = function () {
	if(this.content_width > this.content_height)
		this.scale = this.fgcanvas.height / this.content_height;
	else
		this.scale = this.fgcanvas.width / this.content_width;
}

Render.prototype.ToggleScale = function (toggle) {
	if(toggle) {
		this.cnt_fg.scale(this.scale,this.scale);
		this.cnt_bg.scale(this.scale,this.scale);
	}
	else {
		this.cnt_fg.scale(1 / this.scale, 1 / this.scale);
		this.cnt_bg.scale(1 / this.scale, 1 / this.scale);
	}
}

Render.prototype.SetSize = function (width, height) {
	this.content_width = width;
	this.content_height = height;
	this.UpdateScale();
}

Render.prototype.ResizeCanvas = function() {
	this.fgcanvas.width = window.innerWidth;
	this.fgcanvas.height = window.innerHeight;

	this.bgcanvas.width = window.innerWidth;
	this.bgcanvas.height = window.innerHeight;

	this.UpdateScale();
}

Render.prototype.deltaTime = function() {
	let currentDate = new Date();
	let dTime = currentDate - this.lastRender;
	if (this.lastRender === 0) dTime = 0;
	this.lastRender = currentDate;
	return dTime;
}

Render.prototype.DrawPath = function (points, onBack, effect) {
	if (points.length <= 1)
		return;
	let context = (onBack === true ? this.cnt_bg : this.cnt_fg);

	this.ToggleScale(true);
	context.beginPath();
	context.moveTo(Math.floor(points[0].x), Math.floor(points[0].y));
	for (let i = 1; i < points.length; ++i) {
		context.lineTo(Math.floor(points[i].x), Math.floor(points[i].y));
	}
	context.closePath();

	context.lineWidth = (effect.width !== undefined ? effect.width : 1);
	context.strokeStyle = (effect.edge !== undefined ? effect.edge : 'black');
	context.stroke();

	if (effect.fill !== undefined) {
		context.fillStyle = effect.fill;
		context.fill();
	}
	this.ToggleScale(false);
}

Render.prototype.DrawHex = function (center, radius, onBack, effect) {
	let hexagon = [];
	for (let i = 0; i < 6; ++i) {
		let angle_deg = 60 * i + 30;
		let angle_rad = Math.PI / 180 * angle_deg;
		hexagon.push({
			x: center.x + radius * Math.cos(angle_rad),
			y: center.y + radius * Math.sin(angle_rad)
		});
	}
	this.DrawPath(hexagon, effect, onBack);
}

Render.prototype.DrawLine = function (point1, point2, onBack, effect) {
	this.DrawPath([point1, point2], effect, onBack);
}

Render.prototype.DrawCircle = function (center, radius, onBack, effect) {
	let context = (onBack === true ? this.cnt_bg : this.cnt_fg);

	this.ToggleScale(true);
	context.beginPath();
	context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);

	context.lineWidth = (effect.width !== undefined ? effect.width : 1);
	context.strokeStyle = (effect.edge !== undefined ? effect.edge : 'black');
	context.stroke();

	if (effect.fill !== undefined) {
		context.fillStyle = effect.fill;
		context.fill();
	}
	this.ToggleScale(false);
}

Render.prototype.DrawRectangle = function (rect, onBack, effect) {
	let context = (onBack === true ? this.cnt_bg : this.cnt_fg);

	this.ToggleScale(true);
	context.beginPath();
	context.rect(rect.x, rect.y, rect.w, rect.h);

	context.lineWidth = (effect.width !== undefined ? effect.width : 1);
	context.strokeStyle = (effect.edge !== undefined ? effect.edge : 'black');
	context.stroke();

	if (effect.fill !== undefined) {
		context.fillStyle = effect.fill;
		context.fill();
	}
	this.ToggleScale(false);
}

Render.prototype.DrawFrame = function (anim, x, y, scale, rotation, onCenter, onBack) {
	let context = (onBack === true ? this.cnt_bg : this.cnt_fg);

	let dx = anim.offset_x + anim.cur_frame * anim.w;
	let count = Math.floor(dx / anim.frames_img.width);
	let sx = dx - anim.frames_img.width * count;
	let sy = anim.offset_y + count * anim.h;

	if (onCenter) {
		x -= anim.w / 2 * Math.cos(rotation) - anim.w / 2.5 * Math.sin(rotation);
		y -= anim.h / 2 * Math.sin(rotation) + anim.h / 2.5 * Math.cos(rotation);
	}

	this.ToggleScale(true);
	context.translate(x, y);
	context.rotate(rotation);
	// context.scale(this.scale, this.scale);
	context.drawImage(anim.frames_img, sx, sy, anim.w, anim.h, 0, 0, anim.w * scale, anim.h * scale);
	// context.scale(1, 1);
	context.rotate(-rotation);
	context.translate(-x, -y);
	this.ToggleScale(false);
}

Render.prototype.DrawSprite = function (img, x, y, scale, onBack) {
	let context = (onBack === true ? this.cnt_bg : this.cnt_fg);

	context.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * scale, img.height * scale);
}
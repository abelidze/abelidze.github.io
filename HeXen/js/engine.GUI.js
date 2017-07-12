/*
	GUI Interface Classes and functions
*/

function Clickable(rect) {
	this.rect = rect;
}

Clickable.prototype = Object.create(BaseModel.prototype);

Clickable.prototype.isPressed = function(x, y) {
	return this.isInArea(x, y) && this.mouse.isMoving;
};


function Button(onClick, rect, options) {
	this.onClick = onClick;
	Clickable.call(this, rect);
	this.options = options;
}
Button.prototype = Object.create(Clickable.prototype);

Button.prototype.Draw = function(onBack) {
	this.gm.render.DrawRectangle(this.rect, onBack, this.options);
};


function SplashWindow(text) {
	this.text = text;
	this.name = '.splash';
	this.overlay = $('#overlay');
	this.close = $('.splash, #overlay')
	this.form = $(this.name);
	$('.splash_close').click(this.Close.bind(this));
}

SplashWindow.prototype = Object.create(BaseModel.prototype);

SplashWindow.prototype.FadeIn = function() {
	let that = this;
	this.overlay.fadeIn(400, function()
	{
		$(that.name)
		.css('display', 'block')
		.animate({opacity: 1, top: '50%'}, 200);
	});
};

SplashWindow.prototype.FadeOut = function() {
	let that = this;
	this.form.animate({opacity: 0, top: '45%'}, 200, function()
	{
		$(that.name).css('display', 'none');
		that.overlay.fadeOut(400);
	});
};

SplashWindow.prototype.SetText = function(text) {
	this.text = text;
};

SplashWindow.prototype.Show = function() {
	this.FadeIn();
	$('h3').html(this.text);
};

SplashWindow.prototype.Close = function() {
	$('h3').text('');
	this.FadeOut();
};


function QuestionWindow(text) {
	SplashWindow.call(this, text);
	//properties
}
QuestionWindow.prototype = Object.create(SplashWindow.prototype);


function ScoreWindow(text) {
	SplashWindow.call(this, text);
	//properties
}
ScoreWindow.prototype = Object.create(SplashWindow.prototype);
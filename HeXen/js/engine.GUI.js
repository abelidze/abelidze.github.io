/*
	GUI Interface Classes and functions
*/

function GameGUI() {
	this.GUIElements = [];
    this.MainMenu();
}
GameGUI.prototype = Object.create(BaseModel.prototype);

GameGUI.prototype.AddElement = function (element) {
	this.GUIElements.push(element);
	return element;
}

GameGUI.prototype.Clear = function () {
	this.GUIElements.length = 0;
}

GameGUI.prototype.DrawGUI = function () {
	for(let i = 0; i < this.GUIElements.length; ++i) {
		this.GUIElements[i].Draw();
	}
}

GameGUI.prototype.MainMenu = function () {
	$('#start').click(this.gm.ToggleMenu.bind(this.gm));
	//Score Table
}


function GUIElement() {
	// ...
}
GUIElement.prototype = Object.create(BaseModel.prototype);

GUIElement.prototype.Draw = function () {
	// ...
}

/* SCORE */
function ScoreManager(gui) {
	this.gui = gui;
	this.scoreBar = null;
	this.scoreWin = null;

	this.gm.event.AddEvent('gamestarted', this.Init.bind(this, arguments[1]), true);
	this.maxLevelScore = 100;
	this.score = 0;
}
ScoreManager.prototype = Object.create(BaseModel.prototype);

ScoreManager.prototype.Init = function (radius) {
	let xpos = this.gm.render.content_width - this.gm.grid.shift_x * this.gm.grid.size / 4 + radius * 2;
	this.scoreBar = this.gui.AddElement(new ScoreBar(xpos, radius * 1.5, radius, radius * 1.25) );
	this.scoreWin = new ScoreWindow('No content', false);
    this.gm.event.DeleteEvent('gamestarted', this.Init.bind(this, arguments[1]));
};

ScoreManager.prototype.UpdateScore = function (value) {
	if(this.scoreBar === null) return;

	this.score += value;

	this.scoreBar.SetValue(this.score, this.maxLevelScore);
}

ScoreManager.prototype.ShowScore = function (text) {
	if(this.scoreWin === null) return;

	if(text !== undefined) {
		this.scoreWin.SetText(text);
	}
	this.scoreWin.Show(this.score);
}

ScoreManager.prototype.Reset = function () {
	this.score = 0;
	this.UpdateScore(0);
}

/* SCOREBAR */
function ScoreBar(x, y, radius_in, radius_out) {
	this.value = 0;
	this.pos = new Point(x, y);
	this.radius_in = radius_in;
	this.radius_out = radius_out;
}
ScoreBar.prototype = Object.create(GUIElement.prototype);

ScoreBar.prototype.Draw = function () {
	this.gm.render.DrawCircleBar(this.pos, this.radius_in, this.radius_out, 0, this.value, BarOUTStyle, BarINStyle);
}

ScoreBar.prototype.SetValue = function (value, max) {
	this.value = Math.max(0, Math.min(100, Math.floor(value / max * 100)));
}


/* BUTTONS */
function Clickable(rect) {
	this.rect = rect;
}
Clickable.prototype = Object.create(GUIElement.prototype);

Clickable.prototype.isPressed = function(x, y) {
	return this.isInArea(x, y) && this.mouse.isMoving;
};


function Button(onClick, rect, options) {
	this.onClick = onClick;
	Clickable.call(this, rect);
	this.options = options;
}
Button.prototype = Object.create(Clickable.prototype);

Button.prototype.Draw = function(layer) {
	this.gm.render.DrawRectangle(this.rect, this.options, layer);
};

/* SPLASH MESSAGES */
function SplashWindow(text, once = true) {
	this.id = getRandomInt(10000000, 99999999);
	this.text = text;
	this.overlay = $('#overlay');
	this.name = 'splash';
	this.once = once;

	var div = $('<div>').addClass(this.name).attr('id', this.id).appendTo('body');
	div.append('<form action="" method="post"><h3></h3></form>');

	var splash = $('<span>').addClass(this.name + '_close').text('X').appendTo(div);
	splash.unbind();
	splash.click(this.Close.bind(this));
}
SplashWindow.prototype = Object.create(BaseModel.prototype);

SplashWindow.prototype.FadeIn = function() {
	let that = this;
	this.overlay.fadeIn(400, function()
	{
		$('#' + that.id)
		.css('display', 'block')
		.animate({opacity: 1, top: '30vh'}, 200);
	});
};

SplashWindow.prototype.FadeOut = function() {
	let that = this;
	$('#' + that.id).animate({opacity: 0, top: '20vh'}, 200, function()
	{
		$('#' + that.id).css('display', 'none');
		that.overlay.fadeOut(400);
		if(that.once)
			that.Destroy();
	});
};

SplashWindow.prototype.SetText = function(text) {
	this.text = text;
};

SplashWindow.prototype.Show = function() {
	this.FadeIn();
	$('h3').html(this.text);
	this.gm.SetMode(GameState.PAUSE);
};

SplashWindow.prototype.Close = function() {
	$('h3').text('');
	this.FadeOut();
	this.gm.SetMode(GameState.TURN);
};

SplashWindow.prototype.Destroy = function() {
	$('#' + this.id).remove();
};


function ScoreWindow(text, once) {
	SplashWindow.call(this, text, once);
}
ScoreWindow.prototype = Object.create(SplashWindow.prototype);

ScoreWindow.prototype.Close = function() {
	$('h3').text('');
	this.FadeOut();
	this.gm.NextLevel();
};


function QuestionWindow(text) {
	SplashWindow.call(this, text);
	//properties
}
QuestionWindow.prototype = Object.create(SplashWindow.prototype);


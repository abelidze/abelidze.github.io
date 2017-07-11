/*
 GUI Interface Classes and functions
 */

function Clickable(rect) {
    this.rect = rect;
}

Clickable.prototype.isPressed = function (x, y) {
    return this.isInArea(x, y) && this.mouse.isMoving;
};

function Button(onClick, rect, options) {
    this.onClick = onClick;
    Clickable.call(this, rect);
    this.options = options;
}

Button.prototype = Object.create(Clickable.prototype);

Button.prototype.Draw = function (onBack) {
    this.gm.render.DrawRectangle(this.rect, onBack, this.options);
};

function SplashWindow(text) {
    this.text = text;
    this.overlay = $('#overlay');
    this.close = $('.modal_class, #overlay');
    this.name = '.modal_class, .modal_div';
    this.modal = $('.modal_div');
}

SplashWindow.prototype.FadeIn = function () {
    let that = this;
    this.overlay.fadeIn(400,
        function () {
            $(that.name)
                .css('display', 'block')
                .animate({opacity: 1, top: '50%'}, 200);
        });
};

SplashWindow.prototype.FadeOut = function () {
    let that = this;
    this.modal
        .animate({opacity: 0, top: '45%'}, 200,
            function () {
                $(that.name).css('display', 'none');
                that.overlay.fadeOut(400);
            });
};

function InfoWindow(text) {
    SplashWindow.call(this, text);
}
InfoWindow.prototype = Object.create(SplashWindow.prototype);

InfoWindow.prototype.Show = function () {
    this.FadeIn();
    $('h3').html(this.text);
};

InfoWindow.prototype.Close = function () {
    let new_text = '';
    $('h3').text(new_text);
    //this.FadeOut();
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
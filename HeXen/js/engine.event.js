/**
 * Created by ADMIN on 11.07.2017.
 * Event module
 */

function EventSystem() {
    this.listeners = {};
}

EventSystem.prototype.AddEvent = function (event, listener) {
    if (this.listeners[event] === undefined)
        this.listeners[event] = [];
    this.listeners[event].push(listener);
    document.addEventListener(event, listener);
}

EventSystem.prototype.DeleteEvent = function (event, listener) {
    if (this.listeners[event] !== undefined){
        var listeners = this.listeners[event];
        for (let i = 0; i < listeners.length; ++i)
            if (listeners[i] === listener){
                document.removeEventListener(event, listener);
                listeners.splice(i, 1);
                break;
            }
    }
}

EventSystem.prototype.ScoreEvent = function (event, score) {
    this.AddScore(score);
}

EventSystem.prototype.MouseEvent = function (event, detail) {

}

function Trigger(handler, checker, action, repeat, radius) {
	this.handler = handler;
	this.cheker = checker;
	this.action = action;
	this.repeat = repeat;
	this.radius = radius;
}

Trigger.prototype.Activate = function (event) {
    if (!this.checker(event))
        return;
    if((this.repeat > 0 ) || (this.repeat < 0))
        this.repeat--;
    this.action(event);
};

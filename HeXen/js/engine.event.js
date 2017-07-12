/*
    Event module
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

function Trigger(handler, checker, action, repeat, value, radius) {
	this.handler = handler;
	this.checker = checker;
	this.action = action;
	this.repeat = repeat;
	this.value = value;
	this.radius = radius;
}

Trigger.prototype.Activate = function (object) {
    if (!this.checker(object))
        return;
    if((this.repeat > 0 ) || (this.repeat < 0))
        this.repeat--;
    this.action.apply(this, object);
};
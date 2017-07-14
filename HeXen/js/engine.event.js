/*
    Event module
*/

function EventSystem() {
    this.listeners = {};
}
EventSystem.prototype = Object.create(BaseModel.prototype);

EventSystem.prototype.AddEvent = function (event, listener, mode) {
    if (this.listeners[event] === undefined)
        this.listeners[event] = [];
    this.listeners[event].push(listener);
    if(mode !== true)
        window.addEventListener(event, listener, false);
};

EventSystem.prototype.DeleteEvent = function (event, listener) {
    if (this.listeners[event] !== undefined){
        var listeners = this.listeners[event];
        for (let i = 0; i < listeners.length; ++i)
            if(listeners[i] === listener) {
                window.removeEventListener(event, listener);
                listeners.splice(i, 1);
                if (listeners.length === 0){
                    this.listeners[event] = undefined;
                }
                break;
            }
    }
};

EventSystem.prototype.CallBackEvent = function (event) {
    if(this.listeners[event] !== undefined) {
        var listeners = this.listeners[event];
        for(let i = 0; i < listeners.length; ++i) {
            listeners[i]();
        }
    }
};

// checker == true / false;
// true -> action(initiation_object, options);
// action()

function Trigger(handler, checker, action, repeat, options, radius) {
	this.handler = handler;
	this.checker = checker;
	this.action = action;
	this.repeat = repeat;
	this.options = options ? options : {};
	this.radius = radius;
    this.id = 0;
}
Trigger.prototype = Object.create(BaseModel.prototype);

Trigger.prototype.Activate = function (object) {
    if (!this.checker(object))
        return;
    if (!this.repeat)
        handler.RemoveTrigger(this.id);
    else if (this.repeat > 0)
        this.repeat--;
    if (this.options.delay === undefined)
        this.options.delay = 10;

    let that = this;
    setTimeout(function () {
        that.action(object, that.options);
    }, that.options.delay);
};
/**
 * Created by ADMIN on 11.07.2017.
 * Event module
 */

function EventSystem() {

}

function Trigger(cell, checker, action, repeat, radius) {
    this.cell = cell;
    this.cheker = checker;
    this.action = action;
    this.repeat = repeat;
    this.radius = radius;
}

Trigger.prototype.Activate = function () {
    if((this.repeat > 0 ) || (this.repeat < 0))
        this.repeat--;
    this.action();
};
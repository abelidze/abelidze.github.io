/* Game Logic File */

const isTouched = function (object) {
    return true;
}

const ChangeColor = function (cell, style) {
    cell.SetStyle(style);
}

const OpenDoor = function (object, options) {
    ChangeColor(this.handler, ActivatedStyle);
    this.gm.grid.map[options.y][options.x].object.status = DoorState.OPENED;
}

const NextTrigger = function (trig) {
    trig.Activate();
}

const ChangeLevel = function (object) {
    object.gm.NextLevel();
}

const Pick = dummyFunc;

//Triggers templates

const DoorOpener = function (target_x, target_y, delay) {
    return [isTouched, OpenDoor, 1, {delay: delay, x: target_x, y: target_y}];
}

//var DoorOpener = [isTouched, OpenDoor, 1, {delay: 200}];
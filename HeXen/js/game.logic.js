/* Game Logic File */

const isTouched = function (object) {
    return true;
}

const ChangeColor = function (cell, style) {
    cell.SetStyle(style);
}

const OpenDoor = function () {
    this.object.status = DoorState.OPENED;
    ChangeColor(this, ActivatedStyle);
};
const Pick = dummyFunc;

//Triggers templates

var DoorOpener = [isTouched, OpenDoor];
/* Game Logic File */

const isTouched = function (object) {
    return true;
}

const ChangeColor = function (cell, style) {
    cell.SetStyle(style);
}

const OpenDoor = function (object) {
    //cell.object.status = DoorState.OPENED;
    ChangeColor(this.handler, ActivatedStyle);
}

const ChangeLevel = function (object) {
    object.gm.NextLevel();
}

const Pick = dummyFunc;

//Triggers templates

var DoorOpener = [isTouched, OpenDoor, 1, {}];
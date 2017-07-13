/* Game Logic File */

const isTouched = function (object) {
	return true;
}

const isValid = function (object) {
	return (object == this.options.key);
}

const ChangeColor = function (cell, style) {
    cell.SetStyle(style, true);
}

const DoorTrigger = function (object, options) {
	ChangeColor(this.handler.cell, ActivatedStyle);
	this.handler.Open();
}

const OpenDoor = function (object, options) {
	ChangeColor(this.handler, ActivatedStyle);
	this.gm.grid.map[options.y][options.x].ActivateTriggers(options.key);
}

const ChangeLevel = function (object) {
    object.gm.NextLevel();
}

const ShowInfo = function (object) {
	(new SplashWindow('Find switcher to open a door')).Show();
}

const Pick = dummyFunc;

//Triggers templates

const TInfoCell = function (this_x, this_y, delay) {
	return [isTouched, ShowInfo, {x: this_x, y: this_y, delay: delay}];
}

const TDoorOpener = function (this_x, this_y, key, delay) {
	return [isValid, DoorTrigger, 1, {x: this_x, y: this_y, key: key, delay: delay}];
}

const TDoorKey = function (target_x, target_y, key, delay) {
	return [isTouched, OpenDoor, 1, {key: key, delay: delay, x: target_x, y: target_y}];
}

//var DoorOpener = [isTouched, OpenDoor, 1, {delay: 200}];
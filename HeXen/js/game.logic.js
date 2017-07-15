/*
	Game Logic File [Triggers]
*/

const isTouched = function (object) {
	return true;
}

const isValid = function (object) {
	return (object === this.options.key);
}

const ChangeStyle = function (cell, style) {
	cell.SetStyle(style, true);
}

const DoorTrigger = function (object, options) {

}

const OpenDoor = function (object, options) {
	ChangeStyle(this.handler, DefaultCellStyle);
	let cell = this.gm.grid.map[this.options.y][this.options.x];
    this.gm.ChangeScore(100);
    cell.OpenDoors();
	//this.gm.grid.map[options.y][options.x].ActivateTriggers(options.key);
}

const ChangeLevel = function (object) {
    object.gm.NextLevel();
}

const ShowInfo = function (object, options) {
	ChangeStyle(object.cell, DefaultCellStyle);
    this.gm.ChangeScore(25);
	(new SplashWindow(options.text)).Show();
}

const Pick = dummyFunc;


///                    ///
/// Triggers templates ///
///                    ///

const TInfoCell = function (text, delay) {
	return [isTouched, ShowInfo, 1, {text: text, delay: delay}];
}

//const TDoorOpener = function (this_x, this_y, key, delay) {
	//return [isValid, DoorTrigger, 1, {x: this_x, y: this_y, key: key, delay: delay}];
//}

const TDoorKey = function (target_x, target_y, delay) {
	return [isTouched, OpenDoor, 1, {delay: delay, x: target_y, y: target_x}];
}



//var DoorOpener = [isTouched, OpenDoor, 1, {delay: 200}];
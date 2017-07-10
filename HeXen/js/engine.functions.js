/*
	Standart and engine specific functions
*/

function dummyFunc() {
	alert(this + ' not implemented!');
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
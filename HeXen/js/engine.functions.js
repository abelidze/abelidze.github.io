/*
	Standart and engine specific functions
*/

function dummyFunc() {
	console.log(this);
	alert('Method isn`t implemented!');
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


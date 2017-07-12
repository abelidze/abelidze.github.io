/*
 Base engine functions and models
 */

const BaseModel = function () {
	//...
}

function dummyFunc() {
	console.log(this);
	alert('Method isn`t implemented!');
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function sqr(a) {
	return a * a;
}
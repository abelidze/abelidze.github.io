/*
	Base engine functions and models
*/

const BaseModel = function () {
	//...
};

function dummyFunc () {
	console.log(this);
	alert('Method isn`t implemented!');
}

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function sqr (a) {
	return a * a;
}

function swap (ar, i, j) {
	let buf = ar[i];
	ar[i] = ar[j];
	ar[j] = buf;
}

function fill_array(array, value) {
	for(let i = 0; i < array.length; array[i++] = value){}
}

function fill_array2(array, value) {
	for(let i = 0; i < array.length; ++i) {
		array[i] = [];
		for(let j = 0; j < array[i].length; array[i][j++] = value){}
	}
}
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

function triangle_square(a, b, c) {
	let p = (a + b + c) / 2;
	return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

function sqr(a) {
	return a * a;
}

function inside_triangle(px, py, ax, ay, bx, by, cx, cy) {
	let AB = Math.sqrt(sqr(ax - bx) + sqr(ay - by));
	let BC = Math.sqrt(sqr(bx - cx) + sqr(by - cy));
	let CA = Math.sqrt(sqr(ax - cx) + sqr(ay - cy));

	let AP = Math.sqrt(sqr(ax - px) + sqr(ay - py));
	let BP = Math.sqrt(sqr(bx - px) + sqr(by - py));
	let CP = Math.sqrt(sqr(cx - px) + sqr(cy - py));
	let dif = (triangle_square(AP, BP, AB) + triangle_square(AP, CP, CA) + triangle_square(BP, CP, BC)) - triangle_square(AB, BC, CA);

	return (Math.abs(dif) < 1e-12);

}
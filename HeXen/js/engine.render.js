/*
	All Draw Events and functions
*/
function Render () {
    this.canvas = document.getElementById('game');
	this.context = this.canvas.getContext('2d');
}

Render.prototype.Clear = function (){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

const drawPath = function (context, points, effect) {
	if (points.length <= 1)
		return;
	context.beginPath();
    context.moveTo(Math.floor(points[0].x), Math.floor(points[0].y));
	for (let i = 1; i < points.length; ++i){
		context.lineTo(Math.floor(points[i].x), Math.floor(points[i].y));
	}
	context.closePath();

	if (effect.style !== undefined){
        context.strokeStyle = effect.style;
        context.stroke();
	}

	if (effect.fill !== undefined){
        context.fillStyle = effect.fill;
        context.fill();
	}
}

const drawHex = function (context, center, r, effect) {
	let hexagon = [];
	for (let i = 0; i < 6; ++i){
        let angle_deg = 60*i + 30;
        let angle_rad = Math.PI / 180 * angle_deg;
        hexagon.push({x: center.x + r*Math.cos(angle_rad),
			y: center.y + r*Math.sin(angle_rad)});
	}
	drawPath(context, hexagon, effect);
}

var drawCircle = dummyFunc;

const drawMap = function (edge) {
    var r = 30;
    var shift_x = r*Math.cos(Math.PI/180*30);
    var shift_y = r*Math.sin(Math.PI/180*30);

    for (let j = 100; j < 100 + 9 * shift_y; j += 3 * shift_y) {
        for (let i = 100; i < 100 + 8 * shift_x; i += 2 * shift_x) {
            drawHex(context, {
                x: i + shift_x *(j - 100)/3/shift_y + i / 25,
                y: j + j / 25
            }, r, {style: '#2D936C', fill: '#E8E9EB'});
        }
    }
}
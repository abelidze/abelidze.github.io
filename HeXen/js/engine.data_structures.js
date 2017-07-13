/*
 Data structures used in this project
 */

function Heap() {
	this.array = [];
}

Heap.prototype.SiftDown = function (i) {
	if (this.isEmpty())
		return;
	let left, right, j;
	while ((2 * i + 1) < this.array.length) {
		left = 2 * i + 1;
		right = 2 * i + 2;
		j = left;
		if ((right < this.array.length) && (this.array[right].key < this.array[left].key))
			j = right;
		if (this.array[i].key <= this.array[j].key)
			break;
		swap(this.array, i, j);
		i = j;
	}
};

Heap.prototype.SiftUp = function (i) {
	if(this.isEmpty())
		return;
	while(this.array[i].key < this.array[Math.max(0, Math.floor((i - 1) / 2))].key) {
		let x = Math.max(0, Math.floor((i - 1) / 2));
		swap(this.array, i, x);
		i = x;
	}
};

Heap.prototype.Push = function (key, value) {
	this.array[this.array.length] = {'key': key, 'value': value};
	this.SiftUp(this.array.length - 1);
};

Heap.prototype.Pop = function () {
	let result = null;
	if (this.isEmpty())
		return result;
	result = this.array[0];
	this.array[0] = this.array[this.array.length - 1];
	this.SiftDown(0);
	return result.value;
};

Heap.prototype.GetMin = function () {
	return this.isEmpty() ? null : this.array[0];
};

Heap.prototype.isEmpty = function () {
	return (this.array.length === 0);
};
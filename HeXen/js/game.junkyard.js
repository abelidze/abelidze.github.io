/*
 * Junkyard for game functions
 */

function bfs_distance(c1, c2) {
	return sqr(c1.gridPosition.x - c2.gridPosition.x) + sqr(c1.gridPosition.y - c2.gridPosition.y);
}

function bfs (start, finish) {
	let hexDir = HexDirections;

	let queue = new Heap();
	queue.Push(0, start);

	let used = new Array(sqr(start.grid.size));
	fill_array(used, false);

	let parent = new Array(sqr(start.grid.size));
	fill_array(parent, 0);

	parent[start.gridPosition.y][start.gridPosition.x] = null;

	while (!queue.isEmpty()) {
		let v = queue.Pop();
		for (let i = 0; i < hexDir.length; ++i) {
			let to = v.grid.map[v.gridPosition.y + hexDir[i][1]][v.gridPosition.x + hexDir[i][0]];

			if (!used[to.gridPosition.y][to.gridPosition.x]) {
				used[to.gridPosition.y][to.gridPosition.x] = true;
				let distance = bfs_distance(cell, to);
				queue.Push(distance, to);
				parent[to.gridPosition.y][to.gridPosition.x] = v;
			}

			if (to === finish) {
				return restorePath(parent, finish);
			}
		}
	}
	return null; //no path to finish cell
}

function restorePath (parent, finish) {
	let path = [];
	for (let v = finish; v !== null; v = parent[v.gridPosition.y][v.gridPosition.x])
		path.push(v);
	return path.reverse();
}
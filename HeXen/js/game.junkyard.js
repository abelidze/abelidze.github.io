/*
	Junkyard for game functions
*/

function bfs_distance(c1, c2) {
	return sqr(c1.gridPosition.x - c2.gridPosition.x) + sqr(c1.gridPosition.y - c2.gridPosition.y);
}

function bfs(start, finish) {
	let hexDir = HexDirections;

	let queue = new Heap();
	queue.Push(0, start);

	let used = new Array(start.grid.size);
	fill_array2(used, false);

	let parent = new Array(start.grid.size);
	fill_array2(parent, 0);

	parent[start.gridPosition.y][start.gridPosition.x] = null;

	while (!queue.isEmpty()) {
		let v = queue.Pop();
		for (let i = 0; i < hexDir.length; ++i) {
			let to_y = v.gridPosition.y + hexDir[i][1];
			let to_x = v.gridPosition.x + hexDir[i][0];
			if(!v.grid.isInField(to_x, to_y)) continue;

			let to = v.grid.map[to_y][to_x];
			if(!to.isEmpty()) continue;

			if (!used[to.gridPosition.y][to.gridPosition.x]) {
				used[to.gridPosition.y][to.gridPosition.x] = true;
				let distance = bfs_distance(finish, to);
				queue.Push(distance, to);
				parent[to.gridPosition.y][to.gridPosition.x] = v;
			}

			if (to.id === finish.id)
				return restorePath(parent, start, finish);
		}
	}
	return null;
}

function restorePath(parent, start, finish) {
	let path = [];

	for(let v = finish; v !== start && v !== undefined && v !== null; v = parent[v.gridPosition.y][v.gridPosition.x]) {
		path.push(v);
	}

	return path.reverse();
}
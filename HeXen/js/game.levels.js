/*
	Levels File
*/

const LevelObjFunc = [
	Container,
    Door,
	Wall,
	Player,
	Enemy
];

function Level (size, arr) {
	this.map = arr;
	this.size = size;
};

const GameLevels =
	[
		new Level(16, [
			[LevelObjects.DOOR, 1, 1, [null]],
			[LevelObjects.PLAYER, 1, 3, [null]],
		])

	];
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
			[LevelObjects.PLAYER, 0, 0, [null]],
		])

	];
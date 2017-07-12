/*
    Levels File
*/

/*Constructors of game objects*/
const LevelObjFunc = [
	Container,
	Door,
	Wall,
	Player,
	Enemy,
	Entry,
	Exit
];

function Level(size, objects, triggers) {
	this.size = size;
	this.map = objects;
	this.triggers = triggers;
}

const GameLevels =
    [
        /*new Level(11, [
            [LevelObjects.PLAYER, 0, 0, [ [anim_playerIdle, anim_playerMove] ]],
            [LevelObjects.PLAYER, 5, 5, [ [anim_enemyIdle , anim_enemyMove]  ]],
        ]),*/

        new Level(11,
        [
            // [LevelObjects.TYPE, x, y, [ [anim1, anim2, anim3, ...], [trigger1, trigger2, ...] ]]
            [LevelObjects.PLAYER, 5, 5, [[anim_playerIdle, anim_playerMove]]],

            [LevelObjects.WALL, 5, 0, [null]],
            [LevelObjects.WALL, 6, 0, [null]],
            [LevelObjects.WALL, 7, 0, [null]],
            [LevelObjects.WALL, 8, 0, [null]],
            [LevelObjects.WALL, 9, 0, [null]],
            [LevelObjects.WALL, 10, 0, [null]],

            [LevelObjects.WALL, 4, 1, [null]],
            [LevelObjects.WALL, 10, 1, [null]],

            [LevelObjects.WALL, 3, 2, [null]],
            [LevelObjects.WALL, 10, 2, [null]],

            [LevelObjects.WALL, 2, 3, [null]],
            [LevelObjects.WALL, 3, 3, [null]],
            [LevelObjects.WALL, 10, 3, [null]],

            [LevelObjects.WALL, 1, 4, [null]],
            [LevelObjects.EXIT, 2, 4, [null]],
            [LevelObjects.WALL, 3, 4, [null]],
            [LevelObjects.WALL, 10, 4, [null]],

            [LevelObjects.WALL, 0, 5, [null]],
            [LevelObjects.EXIT, 1, 5, [null]],
            [LevelObjects.EXIT, 2, 5, [null]],
            [LevelObjects.WALL, 3, 5, [null]],
            [LevelObjects.WALL, 10, 5, [null]],

            [LevelObjects.WALL, 0, 6, [null]],
            [LevelObjects.EXIT, 1, 6, [null]],
            [LevelObjects.WALL, 2, 6, [null]],
            [LevelObjects.WALL, 9, 6, [null]],

            [LevelObjects.WALL, 0, 7, [null]],
            [LevelObjects.DOOR, 1, 7, [null]],
            [LevelObjects.WALL, 8, 7, [null]],

            [LevelObjects.WALL, 0, 8, [null]],
            [LevelObjects.WALL, 7, 8, [null]],

            [LevelObjects.WALL, 0, 9, [null]],
            [LevelObjects.WALL, 6, 9, [null]],

            [LevelObjects.WALL, 0, 10, [null]],
            [LevelObjects.WALL, 1, 10, [null]],
            [LevelObjects.WALL, 2, 10, [null]],
            [LevelObjects.WALL, 3, 10, [null]],
            [LevelObjects.WALL, 4, 10, [null]],
            [LevelObjects.WALL, 5, 10, [null]],

            /* Empty cells */
            [LevelObjects.INVISIBLE, 0, 0, [null]],
            [LevelObjects.INVISIBLE, 1, 0, [null]],
            [LevelObjects.INVISIBLE, 2, 0, [null]],
            [LevelObjects.INVISIBLE, 3, 0, [null]],
            [LevelObjects.INVISIBLE, 4, 0, [null]],

            [LevelObjects.INVISIBLE, 0, 1, [null]],
            [LevelObjects.INVISIBLE, 1, 1, [null]],
            [LevelObjects.INVISIBLE, 2, 1, [null]],
            [LevelObjects.INVISIBLE, 3, 1, [null]],

            [LevelObjects.INVISIBLE, 0, 2, [null]],
            [LevelObjects.INVISIBLE, 1, 2, [null]],
            [LevelObjects.INVISIBLE, 2, 2, [null]],

            [LevelObjects.INVISIBLE, 0, 3, [null]],
            [LevelObjects.INVISIBLE, 1, 3, [null]],

            [LevelObjects.INVISIBLE, 0, 4, [null]],

            [LevelObjects.INVISIBLE, 10, 6, [null]],

            [LevelObjects.INVISIBLE, 9, 7, [null]],
            [LevelObjects.INVISIBLE, 10, 7, [null]],

            [LevelObjects.INVISIBLE, 8, 8, [null]],
            [LevelObjects.INVISIBLE, 9, 8, [null]],
            [LevelObjects.INVISIBLE, 10, 8, [null]],

            [LevelObjects.INVISIBLE, 7, 9, [null]],
            [LevelObjects.INVISIBLE, 8, 9, [null]],
            [LevelObjects.INVISIBLE, 9, 9, [null]],
            [LevelObjects.INVISIBLE, 10, 9, [null]],

            [LevelObjects.INVISIBLE, 6, 10, [null]],
            [LevelObjects.INVISIBLE, 7, 10, [null]],
            [LevelObjects.INVISIBLE, 8, 10, [null]],
            [LevelObjects.INVISIBLE, 9, 10, [null]],
            [LevelObjects.INVISIBLE, 10, 10, [null]]
        ],
        [
            [DoorOpener(7, 1, 200), 5, 6]
            // [[checker, action, repeat, {value: ...}], x, y]
        ])
    ];

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
        new Level(11,
        [
            // [LevelObjects.TYPE, x, y, [ [anim1, anim2, anim3, ...], [trigger1, trigger2, ...] ]]
            [LevelObjects.PLAYER, 5, 5, [spr_player]],

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
            [LevelObjects.DOOR, 1, 7, [null, [TDoorOpener(1, 7, 8800, 20)] ]],
            [LevelObjects.STYLE, 2, 7, [ActivatedStyle]],
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
            [TInfoCell(2, 7, 200), 2, 7],
            [TDoorKey(7, 1, 8800, 200), 5, 6]
            // [[checker, action, repeat, {value: ...}], x, y]
        ]),


        new Level(8,
        [
            [LevelObjects.PLAYER, 0, 0, [ spr_player ]],
            [LevelObjects.ENEMY, 5, 5, [ spr_enemy ]],
        ],
        [
            // [[checker, action, repeat, {value: ...}], x, y]
        ]),

        new Level(15,
            [
                [LevelObjects.WALL, 0, 7, [null]],
                [LevelObjects.WALL, 0, 8, [null]],
                [LevelObjects.WALL, 0, 9, [null]],
                [LevelObjects.WALL, 0, 10, [null]],
                [LevelObjects.WALL, 0, 11, [null]],
                [LevelObjects.WALL, 0, 12, [null]],
                [LevelObjects.WALL, 0, 13, [null]],
                [LevelObjects.WALL, 0, 14, [null]],

                [LevelObjects.WALL, 1, 6, [null]],
                [LevelObjects.WALL, 1, 7, [null]],
                [LevelObjects.EXIT, 1, 10, [null]],
                [LevelObjects.WALL, 1, 13, [null]],
                [LevelObjects.WALL, 1, 14, [null]],

                [LevelObjects.WALL, 2, 5, [null]],
                [LevelObjects.WALL, 2, 7, [null]],
                [LevelObjects.WALL, 2, 12, [null]],
                [LevelObjects.WALL, 2, 14, [null]],

                [LevelObjects.WALL, 3, 4, [null]],
                [LevelObjects.WALL, 3, 7, [null]],
                [LevelObjects.WALL, 3, 11, [null]],
                [LevelObjects.WALL, 3, 14, [null]],

                [LevelObjects.WALL, 4, 3, [null]],
                [LevelObjects.WALL, 4, 7, [null]],
                [LevelObjects.WALL, 4, 8, [null]],
                [LevelObjects.DOOR, 4, 9, [null, [TDoorOpener(4, 9, 8800, 20)]]],
                [LevelObjects.WALL, 4, 10, [null]],
                [LevelObjects.WALL, 4, 14, [null]],

                [LevelObjects.WALL, 5, 2, [null]],
                [LevelObjects.WALL, 5, 10, [null]],
                [LevelObjects.WALL, 5, 14, [null]],

                [LevelObjects.WALL, 6, 1, [null]],
                [LevelObjects.DOOR, 6, 10, [null, [TDoorOpener(6, 10, 666, 20)]]],
                [LevelObjects.WALL, 6, 14, [null]],

                [LevelObjects.WALL, 7, 0, [null]],
                [LevelObjects.PLAYER, 7, 1, [spr_player]],
                [LevelObjects.WALL, 7, 7, [null]],
                [LevelObjects.WALL, 7, 10, [null]],
                [LevelObjects.WALL, 7, 11, [null]],
                [LevelObjects.WALL, 7, 12, [null]],
                [LevelObjects.WALL, 7, 13, [null]],
                [LevelObjects.WALL, 7, 14, [null]],

                [LevelObjects.WALL, 8, 0, [null]],
                [LevelObjects.WALL, 8, 9, [null]],
                [LevelObjects.WALL, 8, 13, [null]],

                [LevelObjects.WALL, 9, 0, [null]],
                [LevelObjects.DOOR, 9, 8, [null, [TDoorOpener(6, 10, 777, 20)]]],
                [LevelObjects.WALL, 9, 12, [null]],

                [LevelObjects.WALL, 10, 0, [null]],
                [LevelObjects.WALL, 10, 4, [null]],
                [LevelObjects.DOOR, 10, 5, [null, [TDoorOpener(6, 10, 111, 20)]]],
                [LevelObjects.WALL, 10, 6, [null]],
                [LevelObjects.WALL, 10, 7, [null]],
                [LevelObjects.WALL, 10, 11, [null]],

                [LevelObjects.WALL, 11, 0, [null]],
                [LevelObjects.WALL, 11, 3, [null]],
                [LevelObjects.WALL, 11, 7, [null]],
                [LevelObjects.WALL, 11, 10, [null]],

                [LevelObjects.WALL, 12, 0, [null]],
                [LevelObjects.WALL, 12, 2, [null]],
                [LevelObjects.WALL, 12, 7, [null]],
                [LevelObjects.WALL, 12, 9, [null]],

                [LevelObjects.WALL, 13, 0, [null]],
                [LevelObjects.WALL, 13, 1, [null]],
                [LevelObjects.WALL, 13, 7, [null]],
                [LevelObjects.WALL, 13, 8, [null]],

                [LevelObjects.WALL, 14, 0, [null]],
                [LevelObjects.WALL, 14, 1, [null]],
                [LevelObjects.WALL, 14, 2, [null]],
                [LevelObjects.WALL, 14, 3, [null]],
                [LevelObjects.WALL, 14, 4, [null]],
                [LevelObjects.WALL, 14, 5, [null]],
                [LevelObjects.WALL, 14, 6, [null]],
                [LevelObjects.WALL, 14, 7, [null]],
            ],
            [
                //...
            ]
        )
    ];

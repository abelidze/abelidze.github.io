/*
    Levels File
*/

/* Constructors of game objects */
const LevelObjFunc = [
    Container,
    Door,
    Wall,
    Player,
    Enemy,
    Bonus,
    Exit
];

function Level(size, objects, triggers) {
    this.size = size;
    this.map = objects;
    this.triggers = triggers;
}

const GameLevels =
    [
        new Level(12,
            [
                [LevelObjects.PLAYER, 0, 0, {img: spr_player}],
                [LevelObjects.ENEMY, 5, 5, {img: spr_enemy}],
                [LevelObjects.WALL, 4, 5, {}],
                [LevelObjects.WALL, 3, 5, {}],
                [LevelObjects.WALL, 2, 5, {}],
                [LevelObjects.WALL, 1, 5, {}],
            ],
            [
                // [[checker, action, repeat, {value: ...}], x, y]
            ]
        ),

        new Level(11,
            [
                // [LevelObjects.TYPE, x, y, [ [anim1, anim2, anim3, ...], [trigger1, trigger2, ...] ]]
                [LevelObjects.PLAYER, 5, 5, {img: spr_player}],

                [LevelObjects.WALL, 5, 0, {}],
                [LevelObjects.WALL, 6, 0, {}],
                [LevelObjects.WALL, 7, 0, {}],
                [LevelObjects.WALL, 8, 0, {}],
                [LevelObjects.WALL, 9, 0, {}],
                [LevelObjects.WALL, 10, 0, {}],

                [LevelObjects.WALL, 4, 1, {}],
                [LevelObjects.STYLE, 4, 8, KeyStyle],
                [LevelObjects.WALL, 10, 1, {}],

                [LevelObjects.WALL, 3, 2, {}],
                [LevelObjects.WALL, 10, 2, {}],

                [LevelObjects.WALL, 2, 3, {}],
                [LevelObjects.WALL, 3, 3, {}],
                [LevelObjects.WALL, 10, 3, {}],

                [LevelObjects.WALL, 1, 4, {}],
                [LevelObjects.EXIT, 2, 4, {}],
                [LevelObjects.WALL, 3, 4, {}],
                [LevelObjects.WALL, 10, 4, {}],

                [LevelObjects.WALL, 0, 5, {}],
                [LevelObjects.WALL, 3, 5, {}],
                [LevelObjects.WALL, 10, 5, {}],

                [LevelObjects.WALL, 0, 6, {}],
                [LevelObjects.WALL, 2, 6, {}],
                [LevelObjects.WALL, 9, 6, {}],

                [LevelObjects.WALL, 0, 7, {}],
                [LevelObjects.DOOR, 1, 7, {triggers: [TDoorOpener(1, 7, 8800, 20)] }],
                [LevelObjects.STYLE, 2, 7, ActivatedStyle],
                [LevelObjects.WALL, 8, 7, {}],

                [LevelObjects.WALL, 0, 8, {}],
                [LevelObjects.WALL, 7, 8, {}],

                [LevelObjects.WALL, 0, 9, {}],
                [LevelObjects.WALL, 6, 9, {}],

                [LevelObjects.WALL, 0, 10, {}],
                [LevelObjects.WALL, 1, 10, {}],
                [LevelObjects.WALL, 2, 10, {}],
                [LevelObjects.WALL, 3, 10, {}],
                [LevelObjects.WALL, 4, 10, {}],
                [LevelObjects.WALL, 5, 10, {}],

                /* Empty cells */
                [LevelObjects.INVISIBLE, 0, 0, {}],
                [LevelObjects.INVISIBLE, 1, 0, {}],
                [LevelObjects.INVISIBLE, 2, 0, {}],
                [LevelObjects.INVISIBLE, 3, 0, {}],
                [LevelObjects.INVISIBLE, 4, 0, {}],

                [LevelObjects.INVISIBLE, 0, 1, {}],
                [LevelObjects.INVISIBLE, 1, 1, {}],
                [LevelObjects.INVISIBLE, 2, 1, {}],
                [LevelObjects.INVISIBLE, 3, 1, {}],

                [LevelObjects.INVISIBLE, 0, 2, {}],
                [LevelObjects.INVISIBLE, 1, 2, {}],
                [LevelObjects.INVISIBLE, 2, 2, {}],

                [LevelObjects.INVISIBLE, 0, 3, {}],
                [LevelObjects.INVISIBLE, 1, 3, {}],

                [LevelObjects.INVISIBLE, 0, 4, {}],

                [LevelObjects.INVISIBLE, 10, 6, {}],

                [LevelObjects.INVISIBLE, 9, 7, {}],
                [LevelObjects.INVISIBLE, 10, 7, {}],

                [LevelObjects.INVISIBLE, 8, 8, {}],
                [LevelObjects.INVISIBLE, 9, 8, {}],
                [LevelObjects.INVISIBLE, 10, 8, {}],

                [LevelObjects.INVISIBLE, 7, 9, {}],
                [LevelObjects.INVISIBLE, 8, 9, {}],
                [LevelObjects.INVISIBLE, 9, 9, {}],
                [LevelObjects.INVISIBLE, 10, 9, {}],

                [LevelObjects.INVISIBLE, 6, 10, {}],
                [LevelObjects.INVISIBLE, 7, 10, {}],
                [LevelObjects.INVISIBLE, 8, 10, {}],
                [LevelObjects.INVISIBLE, 9, 10, {}],
                [LevelObjects.INVISIBLE, 10, 10, {}]
            ],
            [
                [TInfoCell(2, 7, 200, 'Find switcher to open a door'), 2, 7],
                [TDoorKey(1, 7, 8800, 200), 4, 8]
                // [[checker, action, repeat, {value: ...}], x, y]
            ]),

        new Level(15,
            [
                [LevelObjects.WALL, 0, 7, {img: spr_player}],
                [LevelObjects.WALL, 0, 8, {}],
                [LevelObjects.WALL, 0, 9, {}],
                [LevelObjects.WALL, 0, 10, {}],
                [LevelObjects.WALL, 0, 11, {}],
                [LevelObjects.WALL, 0, 12, {}],
                [LevelObjects.WALL, 0, 13, {}],
                [LevelObjects.WALL, 0, 14, {}],
                [LevelObjects.WALL, 1, 6, {}],
                [LevelObjects.WALL, 1, 7, {}],
                [LevelObjects.EXIT, 1, 10, {}],
                [LevelObjects.WALL, 1, 13, {}],
                [LevelObjects.WALL, 1, 14, {}],
                [LevelObjects.WALL, 2, 5, {}],
                [LevelObjects.STYLE, 2, 6, SwitcherStyle],
                [LevelObjects.WALL, 2, 7, {}],
                [LevelObjects.WALL, 2, 12, {}],
                [LevelObjects.WALL, 2, 14, {}],
                [LevelObjects.WALL, 3, 4, {}],
                [LevelObjects.WALL, 3, 7, {}],
                [LevelObjects.WALL, 3, 11, {}],
                [LevelObjects.WALL, 3, 14, {}],
                [LevelObjects.WALL, 4, 3, {}],
                [LevelObjects.WALL, 4, 7, {}],
                [LevelObjects.WALL, 4, 8, {}],
                [LevelObjects.DOOR, 4, 9, {triggers: [TDoorOpener(4, 9, 8800, 20)] }],
                [LevelObjects.WALL, 4, 10, {}],
                [LevelObjects.WALL, 4, 14, {}],
                [LevelObjects.WALL, 5, 2, {}],
                [LevelObjects.WALL, 5, 10, {}],
                [LevelObjects.WALL, 5, 14, {}],
                [LevelObjects.WALL, 6, 1, {}],
                [LevelObjects.DOOR, 6, 10, {triggers: [TDoorOpener(6, 10, 666, 20)] }],
                [LevelObjects.WALL, 6, 14, {}],
                [LevelObjects.WALL, 7, 0, {}],
                [LevelObjects.PLAYER, 7, 1, {img: spr_player}],
                [LevelObjects.WALL, 7, 7, {}],
                [LevelObjects.WALL, 7, 10, {}],
                [LevelObjects.WALL, 7, 11, {}],
                [LevelObjects.WALL, 7, 12, {}],
                [LevelObjects.WALL, 7, 13, {}],
                [LevelObjects.WALL, 7, 14, {}],
                [LevelObjects.WALL, 8, 0, {}],
                [LevelObjects.WALL, 8, 9, {}],
                [LevelObjects.STYLE, 8, 10, SwitcherStyle],
                [LevelObjects.WALL, 8, 13, {}],
                [LevelObjects.WALL, 9, 0, {}],
                [LevelObjects.DOOR, 9, 8, {triggers: [TDoorOpener(9, 8, 777, 20)] }],
                [LevelObjects.WALL, 9, 12, {}],
                [LevelObjects.WALL, 10, 0, {}],
                [LevelObjects.WALL, 10, 4, {}],
                [LevelObjects.DOOR, 10, 5, {triggers: [TDoorOpener(10, 5, 111, 20)] }],
                [LevelObjects.WALL, 10, 6, {}],
                [LevelObjects.WALL, 10, 7, {}],
                [LevelObjects.WALL, 10, 11, {}],
                [LevelObjects.WALL, 11, 0, {}],
                [LevelObjects.WALL, 11, 3, {}],
                [LevelObjects.STYLE, 11, 6, SwitcherStyle],
                [LevelObjects.WALL, 11, 7, {}],
                [LevelObjects.WALL, 11, 10, {}],
                [LevelObjects.WALL, 12, 0, {}],
                [LevelObjects.STYLE, 12, 1, SwitcherStyle],
                [LevelObjects.WALL, 12, 2, {}],
                [LevelObjects.WALL, 12, 7, {}],
                [LevelObjects.WALL, 12, 9, {}],
                [LevelObjects.WALL, 13, 0, {}],
                [LevelObjects.WALL, 13, 1, {}],
                [LevelObjects.WALL, 13, 7, {}],
                [LevelObjects.WALL, 13, 8, {}],
                [LevelObjects.WALL, 14, 0, {}],
                [LevelObjects.WALL, 14, 1, {}],
                [LevelObjects.WALL, 14, 2, {}],
                [LevelObjects.WALL, 14, 3, {}],
                [LevelObjects.WALL, 14, 4, {}],
                [LevelObjects.WALL, 14, 5, {}],
                [LevelObjects.WALL, 14, 6, {}],
                [LevelObjects.WALL, 14, 7, {}],
                //Left Invisible
                [LevelObjects.INVISIBLE, 0, 0, {}],
                [LevelObjects.INVISIBLE, 0, 1, {}],
                [LevelObjects.INVISIBLE, 0, 2, {}],
                [LevelObjects.INVISIBLE, 0, 3, {}],
                [LevelObjects.INVISIBLE, 0, 4, {}],
                [LevelObjects.INVISIBLE, 0, 5, {}],
                [LevelObjects.INVISIBLE, 0, 6, {}],
                [LevelObjects.INVISIBLE, 1, 0, {}],
                [LevelObjects.INVISIBLE, 1, 1, {}],
                [LevelObjects.INVISIBLE, 1, 2, {}],
                [LevelObjects.INVISIBLE, 1, 3, {}],
                [LevelObjects.INVISIBLE, 1, 4, {}],
                [LevelObjects.INVISIBLE, 1, 5, {}],
                [LevelObjects.INVISIBLE, 2, 0, {}],
                [LevelObjects.INVISIBLE, 2, 1, {}],
                [LevelObjects.INVISIBLE, 2, 2, {}],
                [LevelObjects.INVISIBLE, 2, 3, {}],
                [LevelObjects.INVISIBLE, 2, 4, {}],
                [LevelObjects.INVISIBLE, 3, 0, {}],
                [LevelObjects.INVISIBLE, 3, 1, {}],
                [LevelObjects.INVISIBLE, 3, 2, {}],
                [LevelObjects.INVISIBLE, 3, 3, {}],
                [LevelObjects.INVISIBLE, 4, 0, {}],
                [LevelObjects.INVISIBLE, 4, 1, {}],
                [LevelObjects.INVISIBLE, 4, 2, {}],
                [LevelObjects.INVISIBLE, 5, 0, {}],
                [LevelObjects.INVISIBLE, 5, 1, {}],
                [LevelObjects.INVISIBLE, 6, 0, {}],
                //Right Invisible

                [LevelObjects.INVISIBLE, 8, 14, {}],
                [LevelObjects.INVISIBLE, 9, 13, {}],
                [LevelObjects.INVISIBLE, 9, 14, {}],
                [LevelObjects.INVISIBLE, 10, 12, {}],
                [LevelObjects.INVISIBLE, 10, 13, {}],
                [LevelObjects.INVISIBLE, 10, 14, {}],
                [LevelObjects.INVISIBLE, 11, 11, {}],
                [LevelObjects.INVISIBLE, 11, 12, {}],
                [LevelObjects.INVISIBLE, 11, 13, {}],
                [LevelObjects.INVISIBLE, 11, 14, {}],
                [LevelObjects.INVISIBLE, 12, 10, {}],
                [LevelObjects.INVISIBLE, 12, 11, {}],
                [LevelObjects.INVISIBLE, 12, 12, {}],
                [LevelObjects.INVISIBLE, 12, 13, {}],
                [LevelObjects.INVISIBLE, 12, 14, {}],
                [LevelObjects.INVISIBLE, 13, 9, {}],
                [LevelObjects.INVISIBLE, 13, 10, {}],
                [LevelObjects.INVISIBLE, 13, 11, {}],
                [LevelObjects.INVISIBLE, 13, 12, {}],
                [LevelObjects.INVISIBLE, 13, 13, {}],
                [LevelObjects.INVISIBLE, 13, 14, {}],
                [LevelObjects.INVISIBLE, 14, 8, {}],
                [LevelObjects.INVISIBLE, 14, 9, {}],
                [LevelObjects.INVISIBLE, 14, 10, {}],
                [LevelObjects.INVISIBLE, 14, 11, {}],
                [LevelObjects.INVISIBLE, 14, 12, {}],
                [LevelObjects.INVISIBLE, 14, 13, {}],
                [LevelObjects.INVISIBLE, 14, 14, {}],
            ],
            [
                [TDoorKey(10, 5, 111, 200), 2, 6],
                [TDoorKey(6, 10, 666, 200), 11, 6],
                [TDoorKey(9, 8, 777, 200), 12, 1],
                [TDoorKey(4, 9, 8800, 200), 8, 10]
            ]
        ),
    ];

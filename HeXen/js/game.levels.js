/*
    Levels File
*/

/* Constructors of game objects */
const LevelObjFunc =
{
    '#': dummyFunc,
    '.': dummyFunc,
    'P': Player,
    'E': Enemy,
    'W': Wall,
    'B': Wall,
    'D': Door,
    'X': Exit,
    'K': Wall
};

function Level(map, triggers, options, actionPoints = 10) {
    this.map = map;
    this.triggers = triggers;
    this.options = options;
    this.actionPoints = actionPoints;
}

// ' ' - space, invisible
// . - empty
// P - player
// E - enemy
// W - wall
// B - border
// D - door
// X - exit
// T at left position - trigger
// ^ at 

const GameLevels =
    [
        new Level
        (
            [
                ['#','#','#','#','#','#','#','B','B','B','B','B','B','B','B'],
                  ['#','#','#','#','#','#','B','W','.','.','X','.','.','W','B'],
                    ['#','#','#','#','#','B','T^','W','.','.','.','.','W','.','B'],
                      ['#','#','#','#','B','.','.','W','.','.','.','^','.','.','B'],
                        ['#','#','#','B','.','.','.','W','W','D','W','.','.','.','B'],
                          ['#','#','B','.','.','.','.','.','.','.','W','.','.','.','B'],
                            ['#','B','.','.','.','.','.','.','.','.','D','.','.','.','B'],
                              ['B','P','.','.','.','.','.','W','.','E','W','W','W','W','B'],
                                ['B','.','.','.','.','.','.','.','.','W','T^','.','.','B','#'],
                                  ['B','.','.','.','.','.','.','.','D','.','.','.','B','#','#'],
                                    ['B','.','.','.','W','D','W','W','.','.','.','B','#','#','#'],
                                      ['B','.','.','W','.','.','T^','W','.','.','B','#','#','#','#'],
                                        ['B','T^','W','.','.','.','.','W','.','B','#','#','#','#','#'],
                                          ['B','W','.','.','.','.','.','W','B','#','#','#','#','#','#'],
                                            ['B','B','B','B','B','B','B','B','#','#','#','#','#','#','#'],
            ],
            [
                [TDoorKey(6, 10)],
                [TDoorKey(4, 9)],
                [TDoorKey(9, 8)],
                [TDoorKey(10, 5)]
            ],
            [
                {style: KeyStyle},
                {style: WallStyle},
                {path: [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 1, 1]},
                {style: KeyStyle},
                {style: KeyStyle},
                {style: KeyStyle}
            ]
        ),

        new Level
        (
            [
                ['#','#','#','#','#','#','#','#','#','#','#'],
                  ['#','#','#','#','#','#','#','B','B','B','B'],
                    ['#','#','#','#','B','B','B','D','.','X','B'],
                      ['#','#','#','B','.','.','.','W','W','W','B'],
                        ['#','B','B','.','.','.','.','E','.','.','B'],
                          ['B','P','.','W','W','W','W','W','W','W','B'],
                            ['B','B','.','.','.','.','.','.','.','W','B'],
                              ['#','B','.','.','.','W','W','W','E','T^','B'],
                                ['#','B','B','B','.','.','.','.','B','B','#'],
                                  ['#','#','#','B','B','B','B','B','#','#','#'],
                                    ['#','#','#','#','#','#','#','#','#','#','#'],
            ],
            [
                [TDoorKey(2, 7)]
            ],
            [
                {path: [3, 3, 3, 4, 6, 6, 1, 6, 6, 6, 3, 3]},
                {path: [2, 3, 3, 3, 4, 5, 6, 6, 6, 1]},
                {style: KeyStyle}
            ],
            15
        ),

        new Level
        (
            [
                ['#','#','#','#','B','B','B','B'],
                ['#','#','#','B','.','P','.','B'],
                ['#','#','B','.','.','T^','.','B'],
                ['#','B','T^','W','D','W','.','B'],
                ['#','B','W','.','.','W','B','#'],
                ['#','B','.','X','.','B','#','#'],
                ['#','B','.','.','B','#','#','#'],
                ['#','B','B','B','#','#','#','#']
            ],
            [
                [TInfoCell(TutorialInfo1)],
                [TDoorKey(3, 4, 100)]
            ],
            [
                {style: InfoStyle},
                {style: KeyStyle}
            ],
            17
        ),

        new Level
        (
            [
                ['B','B','B','B','.','.','#','X'],
                  ['B','T^','.','B','B','.','.','.'],
                    ['B','.','W','.','B','D','.','.'],
                      ['B','^','.','.','.','B','B','#'],
                        ['B','.','.','W','.','.','B','B'],
                          ['B','W','T^','W','.','.','E','B'],
                            ['B','P','W','.','.','.','T^','B'],
                              ['B','B','B','B','B','B','B','B']
            ],
            [
                [TInfoCell(TopSecret)],
                [TInfoCell(TutorialInfo2)],
                [TDoorKey(7, 6)]
            ],
            [
                {style: InfoStyle},
                {style: WallStyle},
                {style: InfoStyle},
                {path: [3, 3, 2, 6, 6, 5]},
                {style: KeyStyle}
            ],
            24
        ),

        // new Level
        // (
        //     [
        //         ['.','.','.','.','.','.','.','.'],
        //           ['.','.','.','.','.','.','.','.'],
        //             ['.','.','.','.','.','.','.','.'],
        //               ['.','.','.','.','.','.','.','.'],
        //                 ['.','.','.','.','.','.','.','.'],
        //                   ['.','.','.','.','.','.','.','.'],
        //                     ['.','.','.','.','.','.','.','.'],
        //                       ['.','.','.','.','.','.','.','.'],
        //     ],
        //     [
        //         [triggers]
        //     ],
        //     [
        //         [paths]
        //     ]
        // ),
    ];

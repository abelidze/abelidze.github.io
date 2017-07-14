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

function Level(map, triggers, options) {
    this.map = map;
    this.triggers = triggers;
    this.options = options;
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
                ['#','#','#','#','B','B','B','B'],
                  ['#','#','#','B','.','P','.','B'],
                    ['#','#','B','.','.','T','.','B'],
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
            ]
        ),

        new Level
        (
            [
                ['B','B','B','B','.','.','.','X'],
                  ['B','.','.','B','B','.','.','.'],
                    ['B','.','.','.','B','D','.','.'],
                      ['B','.','.','.','.','B','B','.'],
                        ['B','.','.','W','.','.','B','B'],
                          ['B','W','T^','W','.','.','E','B'],
                            ['B','P','W','.','.','.','T^','B'],
                              ['B','B','B','B','B','B','B','B']
            ],
            [
                [TInfoCell(TutorialInfo2)],
                [TDoorKey(6, 7)]
            ],
            [
                {style: KeyStyle},
                {path: [3, 3, 2, 6, 6, 5]},
                {style: KeyStyle}
            ]
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

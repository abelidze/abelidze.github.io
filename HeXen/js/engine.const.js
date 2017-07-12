const GameObjectTypes = {
    NONE: -2,
    INVISIBLE: -1,
    STATIC: 0,
    DYNAMIC: 1,
    DOOR: 2,
    WALL: 3,
    ENTRY: 4,
    EXIT:5,
    CONTAINER: 6,
    CUBE: 7,
    PLAYER: 8,
    ENEMY: 9
};

const CellState = {
    INVISIBLE: 0,
    EMPTY: 1,
    OBJECT: 2
};

const InteractResult = {
    NOTHING: 0,
    MOVED: 1,
    ATTACK: 2,
    DIE: 3,
    OPEN: 4,
    TAKE: 5
};

const GameState = {
    MENU: 0,
    PAUSE: 1,
    TURN: 2,
    ANIMATING: 3,
    LOADING: 4,
    RESULTS: 5
};

const DoorState = {
    CLOSED: 0,
    OPENED: 1
};

const GameResult = {
    NONE: 0,
    WIN: 1,
    LOSE: 2
};

const LevelObjects = {
    INVISIBLE: -1,
    CONTAINER: 0,
    DOOR: 1,
    WALL: 2,
    PLAYER: 3,
    ENEMY: 4
};

const AnimationState = {
    IDLE: 0,
    MOVE: 1,
    ATTACK: 2,
    DIE: 3
};

const AnimatorModes = {
    EASE: 0,
    LINEAR: 1
};

const EventType = {
    LISTEN : 0,
    DRAW: 1,
    CUSTOM: 2
}

const HexDirections = [
    [+1, 0], [+1, -1], [0, -1],
    [-1, 0], [-1, +1], [0, +1]
];

const ClickRadius = 16;
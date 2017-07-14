/*
	Game Config File
*/

/* CONSTANTS */
const ScoreBarRadius = 80;


/* GRID */
const ActivatedStyle   = {edge: 'grey', fill: '#5FD4B1', width: 3, prior: 2};
const DefaultCellStyle = {edge: 'grey', fill: '#C0C0C0', width: 3}; 
const DoorStyleClosed  = {edge: 'white', fill: '#F1A9A0', width: 3, prior: 3};
const DoorStyleOpened  = {edge: 'white', fill: '#5FD4B1', width: 3, prior: 3};
const ExitStyle        = {edge: 'white', fill: '#9EC5AB', width: 3};
const NearbyCellStyle  = {edge: 'grey', fill: '#D0D0D0', width: 3, prior: 1};
const SwitcherStyle    = {edge: 'grey', fill: '#B0A5D7', width: 3, prior: 2};
const TestStyle        = {edge: 'red', fill: '#000', width: 3};
const WallStyle        = {edge: 'white', fill: '#E63946', width: 3};


/* GUI */
const BarINStyle       = {edge: 'rgba(0,0,0,0)', fill: '#999999', width: 3};
const BarOUTStyle      = {edge: 'rgba(0,0,0,0)', fill: '#E63946', width: 3};


/* ENUMS */
const CellState = {
	INVISIBLE: 0,
	EMPTY: 1,
	OBJECT: 2
};

const DoorState = {
	CLOSED: 0,
	OPENED: 1
};

const GameObjectTypes = {
	NONE: -2,
	INVISIBLE: -1,
	STATIC: 0,
	DOOR: 1,
	WALL: 2,
	BONUS: 3,
	EXIT: 4,
	DYNAMIC: 5,
	CONTAINER: 6,
	CUBE: 7,
	PLAYER: 8,
	ENEMY: 9
};

const LevelObjects = {
	INVISIBLE: -1,
	CONTAINER: 0,
	DOOR: 1,
	WALL: 2,
	PLAYER: 3,
	ENEMY: 4,
	BONUS: 5,
	EXIT: 6,
	BORDER: 7,
	STYLE: 8
};

const HexDirections = [
	[0, +1], [-1, +1], [-1, 0],
	[0, -1], [+1, -1], [+1, 0]
];

const EnemyBehavior = {
	GUARD: 0,
	HAUNT: 1,
	RETURN: 2
};

const SoundNames = [
	"./sounds/HIT.mp3",
	"./sounds/GENERATOR.mp3",
	"./sounds/ROAR.mp3",
	"./sounds/RESTLESS_1.mp3",
	"./sounds/RESTLESS_2.mp3",
	"./sounds/ALARM.mp3"
];

const SoundIndex = {
	HIT: 0,
	GENERATOR: 1,
	ROAR: 2,
	RESTLESS_1: 3,
	RESTLESS_2: 4,
	ALARM: 5
};
const CellState = {
	INVISIBLE: 0,
	EMPTY: 1,
	OBJECT: 2
};

const InteractResult = {
	NOTHING: 0,
	MOVED: 1,
	ATTACK: 2,
	DIE: 3
};

const GameState = {
	MENU: 0,
	PAUSE: 1,
	TURN: 2,
	LOADING: 3,
	RESULTS: 4
};

const GameResult = {
	NONE: 0,
	WIN: 1,
	LOSE: 2
};

const HexDirections = [
	[+1, 0], [+1, -1], [0, -1],
	[-1, 0], [-1, +1], [0, +1]
];

const ClickRadius = 16;
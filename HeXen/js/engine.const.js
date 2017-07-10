const CellState = {
	INVISIBLE: -1,
	EMPTY: 0,
	STATIC: 1,
	DYNAMIC: 2
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
/*
	Game Config File
*/

/* CONSTANTS */
const ScoreBarRadius = 80;
const WinScoreMessage = '<center>Congratulations!<br>Your score:</center><br>';
const TutorialInfo0 = 'Welcome to HexTen!';
const TutorialInfo1 = 'Pick up keys to open doors';
const TutorialInfo2 = 'Be aware of monsters!';
const TopSecret = "You've found a secret number one: <br> usq abyxe xul xoshipb";
const GameOverMessage = 'So far... levels are over, we can suggest you try to improve your score result and fight with dark force again!';
const OHYouDead = '<center>Oh, no! Your are dead!</center>';
const PlayerHaveNotTurns = '<center>OOOOOPS!!!<br>No energy, be more efficient next time! ;)</center>';


/* GRID */
const DefaultCellStyle = {img: img_floor, edge: 'grey', width: 3};
const DoorStyleClosed  = {img: img_door_closed, edge: 'grey', width: 2, prior: 3};
const DoorStyleOpened  = {img: img_door_opened, edge: 'grey', width: 2, prior: 3};
const ExitStyleOpened  = {img: img_exit_opened, edge: 'grey', width: 2};
const NearbyCellStyle  = {edge: 'rgba(0,0,0,0)', fill: '#aba', width: 3, prior: 1};
const KeyStyle    	   = {img: img_key, edge: 'grey', width: 3, prior: 2};
const TestStyle        = {edge: 'red', fill: '#000', width: 3};
const WallStyle        = {img: img_wall, edge: 'grey', width: 2, prior: 2};
const InfoStyle		   = {img: img_info, edge: 'grey', width: 2, prior: 2};


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

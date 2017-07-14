const InteractResult = {
	NOTHING: 0,
	MOVED: 1,
	ATTACK: 2,
	OPEN: 3,
	TAKE: 4,
	DIE: 5,
	EXIT: 6
};

const GameState = {
	MENU: 0,
	PAUSE: 1,
	TURN: 2,
	ANIMATING: 3,
	LOADING: 4,
	RESULTS: 5,
	NEXTLEVEL: 6
};

const GameResult = {
	NONE: 0,
	WIN: 1,
	LOSE: 2
};

const DrawableType = {
	IMAGE: 0,
	ANIMATION: 1
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
	LISTEN: 0,
	DRAW: 1,
	CUSTOM: 2
};

const ClickRadius = 16;

const EPS = Number.EPSILON;

const SoundNames = [
	"./sounds/HIT.mp3",
	"./sounds/GENERATOR.mp3",
	"./sounds/ROAR.mp3",
	"./sounds/RESTLESS_1.mp3",
	"./sounds/RESTLESS_2.mp3",
	"./sounds/ALARM.mp3",
	"./sounds/ALARM.mp3",
	"./sounds/HORIZON_SHADOWLANDS_1.mp3",
	"./sounds/BRIDGE_SHADOWLANDS_2.mp3"
];

const SoundIndex = {
	HIT: 0,
	GENERATOR: 1,
	ROAR: 2,
	RESTLESS_1: 3,
	RESTLESS_2: 4,
	ALARM: 5,
	HORIZON: 6
};
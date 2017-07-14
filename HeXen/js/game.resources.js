/*
	Sprites, animations and other data
*/

/* Set Images */
var img_playerIdle = new Image();
var img_playerMove = new Image();
var img_enemyIdle = new Image();
var img_enemyMove = new Image();
var img_wall = new Image();
var img_floor = new Image();
var img_key = new Image();
var img_exit_opened = new Image();
var img_exit_closed = new Image();

/* Load Images */
img_playerIdle.src = 'img/Player/playerIdle.png';
img_playerMove.src = 'img/Player/playerMove.png';
img_enemyIdle.src = 'img/Enemy/enemyIdle.png';
img_enemyMove.src = 'img/Enemy/enemyMove.png';
img_wall.src = 'img/wall.png';
img_floor.src = 'img/floor.png';
img_key.src = 'img/key.png';
img_exit_opened.src = 'img/exit_opened.png';
img_exit_closed.src = 'img/exit_closed.png';

/* Create Animations */
var anim_playerIdle = new Animation(img_playerIdle, 1, 0, 0, 48, 48, 5);
var anim_playerMove = new Animation(img_playerMove, 8, 0, 0, 48, 48, 2);
var anim_enemyIdle = new Animation(img_enemyIdle, 8, 0, 0, 48, 48, 12);
var anim_enemyMove = new Animation(img_enemyMove, 8, 0, 0, 48, 48, 2);

/* Init sprites */
var spr_player = new Sprite([anim_playerIdle, anim_playerMove]);
var spr_enemy = new Sprite([anim_enemyIdle, anim_enemyMove]);
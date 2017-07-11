/*
	Sprites, animations and other data
*/

/* Set Images */
var spr_playerIdle = new Image();
var spr_playerMove = new Image();
var spr_enemyIdle = new Image();
var spr_enemyMove = new Image();

/* Load Images */
spr_playerIdle.src = 'img/Player/playerIdle.png';
spr_playerMove.src = 'img/Player/playerMove.png';
spr_enemyIdle.src = 'img/Enemy/enemyIdle.png';
spr_enemyMove.src = 'img/Enemy/enemyMove.png';

/* Init sprites */

/* Create Animations */
var anim_playerIdle = new Animation(spr_playerIdle, 1, 0, 0, 48, 48, 5);
var anim_playerMove = new Animation(spr_playerMove, 8, 0, 0, 48, 48, 5);
var anim_enemyIdle = new Animation(spr_enemyIdle, 8, 0, 0, 48, 48, 12);
var anim_enemyMove = new Animation(spr_enemyMove, 8, 0, 0, 48, 48, 5);
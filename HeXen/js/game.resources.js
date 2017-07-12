/*
	Sprites, animations and other data
*/

/* Set Images */
var img_playerIdle = new Image();
var img_playerMove = new Image();
var img_enemyIdle = new Image();
var img_enemyMove = new Image();

/* Load Images */
img_playerIdle.src = 'img/Player/playerIdle.png';
img_playerMove.src = 'img/Player/playerMove.png';
img_enemyIdle.src = 'img/Enemy/enemyIdle.png';
img_enemyMove.src = 'img/Enemy/enemyMove.png';

/* Init sprites */

/* Create Animations */
var anim_playerIdle = new Animation(img_playerIdle, 1, 0, 0, 48, 48, 5);
var anim_playerMove = new Animation(img_playerMove, 8, 0, 0, 48, 48, 2);
var anim_enemyIdle = new Animation(img_enemyIdle, 8, 0, 0, 48, 48, 12);
var anim_enemyMove = new Animation(img_enemyMove, 8, 0, 0, 48, 48, 2);
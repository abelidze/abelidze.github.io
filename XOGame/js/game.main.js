var gameManager = new GameManager(3, 3, 3);
gameManager.AddPlayer(CellState.CROSS, ActorType.EASY);
gameManager.AddPlayer(CellState.CIRCLE, ActorType.EASY);
window.onload = InitMenu;
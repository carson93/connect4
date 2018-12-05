var saveGame = (gameState, colState, playerState, AI_ON) => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
    localStorage.setItem("colState", JSON.stringify(colState));
    localStorage.setItem("playerState", playerState);
    localStorage.setItem("AI_ON", String(AI_ON));
};

var loadGame = () => {
    var gameState = JSON.parse(localStorage.getItem("gameState"));
    var colState = JSON.parse(localStorage.getItem("colState"));
    var playerState = localStorage.getItem("playerState");
    var AI_ON = localStorage.getItem("AI_ON") === 'true';
	return [gameState, colState, playerState, AI_ON];
};

export { saveGame, loadGame };
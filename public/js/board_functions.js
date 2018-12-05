const EMPTY_COL_STATE = [0, 0, 0, 0, 0, 0, 0];
const EMPTY_GAME_STATE = [];
const ROWS = 6;
const COLUMNS = 7;
const EMPTY_SLOT_COLOR = "white";
const PLAYER_ONE_COLOR = "yellow";
const PLAYER_TWO_COLOR = "red";

var newGameState = (gameState, colState, playerState) => {
    document.getElementById("winner_notif").style.height = '0px';
    document.getElementById("winner_notif").innerHTML = '';
    playerState = PLAYER_ONE_COLOR;
    colState = EMPTY_COL_STATE.slice(0);
    gameState = EMPTY_GAME_STATE.slice(0);

    for (let col = 0; col < COLUMNS; col++) {
        var column = []
        for (let row = 0; row < ROWS; row++) {
            column.push(EMPTY_SLOT_COLOR);
        }
        gameState.push(column);
    }
    return [gameState, colState, playerState]
}

var createBoard = (gameState) => {
    document.getElementById("board").innerHTML = "";

    for (let x = 0; x < COLUMNS; x++) {
        var newColumn = document.createElement("div");
        document.getElementById("board").appendChild(newColumn);

        newColumn.className = "columns";
        newColumn.id = "col" + x;

        for (let y = 0; y < ROWS; y++) {
            var newSlot = document.createElement("div");
            newColumn.prepend(newSlot);

            newSlot.className = "slots";
            newSlot.id = "s" + x + y;
            newSlot.style.backgroundColor = gameState[x][y];
        };
    };
};

var print_column_full = () => {
    // should probably also get called on mouseover, depending how its implemented
    console.log('print_column_full was called');
    return "Rwar";
};

export { newGameState, createBoard, print_column_full };
var check_for_winner = (current_player_color, curGameState, rows, columns, empColor) => {
    // credit to 4castle https://codereview.stackexchange.com/questions/127091/java-connect-four-four-in-a-row-detection-algorithms
    // for this function
    const row_length = rows;
    const col_length = columns;
    const gameState = curGameState;

    for (let row = 0; row < row_length; row++) { // iterate rows, bottom to top
        for (let col = 0; col < col_length; col++) { // iterate columns, left to right
            var player = gameState[col][row];
            if (player == empColor){
                continue; // don't check empty slots
            }

            if (col + 3 < col_length &&
                player == gameState[col + 1][row] && // look right
                player == gameState[col + 2][row] &&
                player == gameState[col + 3][row]) {
                return player;
            }
            if (row + 3 < row_length) {
                if (player == gameState[col][row + 1] && // look up
                    player == gameState[col][row + 2] &&
                    player == gameState[col][row + 3]) {
                    return player;
                }
                if (col + 3 < col_length &&
                    player == gameState[col + 1][row + 1] && // look up & right
                    player == gameState[col + 2][row + 2] &&
                    player == gameState[col + 3][row + 3]) {
                    return player;
                }
                if (col - 3 >= 0 &&
                    player == gameState[col - 1][row + 1] && // look up & left
                    player == gameState[col - 2][row + 2] &&
                    player == gameState[col - 3][row + 3]) {
                    return player;
                }
            }
        }
    }
    return false
}

var end_game = (player_color, columns) => {
    for (let x = 0; x < columns; x++) {
        var el = document.getElementById('col' + x),
            elClone = el.cloneNode(true);

        el.parentNode.replaceChild(elClone, el);
    };
    // var newColumn = document.createElement("div");

    // newColumn.id = "col" + x;
    // appendChild
    document.getElementById("winner_notif").style.height = '115px';

    document.getElementById("winner_notif").prepend(document.createTextNode(player_color + " wins!!!!!"));


};

export { end_game, check_for_winner };
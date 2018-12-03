const ROWS = 6;
const COLUMNS = 7;
const EMPTY_SLOT_COLOR = "white";
const PLAYER_ONE_COLOR = "yellow";
const PLAYER_TWO_COLOR = "red";
const FILEPATH = 'game_save/data.json';
const EMPTY_COL_STATE = [0, 0, 0, 0, 0, 0, 0];
const EMPTY_GAME_STATE = [];

var colState = EMPTY_COL_STATE;
var gameState = EMPTY_GAME_STATE;
var playerState = PLAYER_ONE_COLOR;
var AI_ON;

class AI_API {
    constructor() {
        this.name = "robot";
    }

    // redundant repeat of above method, simplified
    static clickColumn(column_number) {
        if (colState[column_number] >= 6) {
            return false;
        } else if (document.getElementById('col' + column_number) == null) {
            return true;
        } else {
            document.getElementById('col' + column_number).click();
            return true;
        }
    }

    // this is where you code your bot, each class below here is a different bot.

    // clickColumn returns false if the move is not valid

    static run_random_ai(opponent_move, board_state) {
        // console.log('random ai move ');
        do {
            var AI_move = Math.floor(Math.random() * 100000) % 7;
            // console.log(AI_move);
            var valid_move = this.clickColumn(AI_move);
        } while (valid_move == false)

    }
    static run_copy_cat_ai(opponent_move, board_state) {
        // console.log('random ai move ');
        valid_move == true;
        do {
            var AI_move = opponent_move;
            if (valid_move == false) {
                AI_move = Math.floor(Math.random() * 100000) % 7;
            }
            // console.log(AI_move);
            var valid_move = this.clickColumn(AI_move);
        } while (valid_move == false)

    }

    static run_copy_cat_improved_ai(opponent_move, board_state) {
        return
    }

    static run_your_ai(opponent_move, board_state) {
        return

    }
}


document.getElementById("AI_NewGame").addEventListener("click", function() {
    newGameState();
    AI_ON = true;
    createBoard();
    createMoves();
});

document.getElementById("newGameButton").addEventListener("click", function() {
    newGameState();
    AI_ON = false;
    createBoard();
    createMoves();
});

document.getElementById("saveGameButton").addEventListener("click", function() {
    try {
        localStorage.setItem("gameState", JSON.stringify(gameState));
        localStorage.setItem("colState", JSON.stringify(colState));
        alert('Game successfully saved');
    } catch (error) {
        console.log(error);
        alert('Game cannot be saved');
    }
})

document.getElementById("loadGameButton").addEventListener("click", function() {
    try {
        gameState = JSON.parse(localStorage.getItem("gameState"));
        colState = JSON.parse(localStorage.getItem("colState"));
        createBoard();
        createMoves();
    } catch (error) {
        console.log(error);
        alert('Game cannot be loaded');
    }
})

var newGameState = () => {
    document.getElementById("winner_notif").style.height = '0px';
    document.getElementById("winner_notif").innerHTML = '';
    playerState = PLAYER_ONE_COLOR;
    colState = EMPTY_COL_STATE.slice(0);
    gameState = [];

    for (let col = 0; col < COLUMNS; col++) {
        var column = []
        for (let row = 0; row < ROWS; row++) {
            column.push(EMPTY_SLOT_COLOR);
        }
        gameState.push(column);
    }
}

var createBoard = () => {
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

var createMoves = () => {
    for (let x = 0; x < COLUMNS; x++) {
        document.getElementById("col" + x).addEventListener("mouseover", function() {
            if ((document.getElementById("s" + x + colState[x])) == null) {
                print_column_full()
            } else {
                document.getElementById("s" + x + colState[x]).style.backgroundColor = "grey";
            }
        });

        document.getElementById("col" + x).addEventListener("mouseout", function() {
            if ((document.getElementById("s" + x + colState[x])) == null) {
                print_column_full()
            } else {
                document.getElementById("s" + x + colState[x]).style.backgroundColor = EMPTY_SLOT_COLOR;
            }
        });


        document.getElementById("col" + x).addEventListener("click", function() {
            if ((document.getElementById("s" + x + colState[x])) == null) {
                print_column_full()
            } else {
                if (playerState == PLAYER_ONE_COLOR) {
                    gameState[x][colState[x]] = PLAYER_ONE_COLOR;
                    document.getElementById("s" + x + colState[x]).style.backgroundColor = PLAYER_ONE_COLOR;
                    colState[x]++;
                    playerState = PLAYER_TWO_COLOR;
                    write_move();


                    winner = check_for_winner(PLAYER_ONE_COLOR);
                    if (winner) {
                        end_game(PLAYER_ONE_COLOR);
                    }

                    // start ai code if needed
                    if (AI_ON == true && playerState == PLAYER_TWO_COLOR) {
                        // console.log('initialize AI');
                        const I_Robot = new AI_API();
                        console.log('run ai start');
                        // slice prevents any  ai action from breaking the game, I hope
                        AI_API.run_random_ai(x, gameState.slice(0));
                    }
                    // end ai code

                } else if (playerState == PLAYER_TWO_COLOR) {

                    gameState[x][colState[x]] = PLAYER_TWO_COLOR;
                    document.getElementById("s" + x + colState[x]).style.backgroundColor = PLAYER_TWO_COLOR;
                    colState[x]++;
                    playerState = PLAYER_ONE_COLOR;


                    winner = check_for_winner(PLAYER_TWO_COLOR);
                    if (winner) {
                        end_game(PLAYER_TWO_COLOR);
                    }
                };
            }

        });

    };
};

var end_game = (player_color) => {
    for (let x = 0; x < COLUMNS; x++) {
        var el = document.getElementById('col' + x),
            elClone = el.cloneNode(true);

        el.parentNode.replaceChild(elClone, el);
    }
    // var newColumn = document.createElement("div");

    // newColumn.id = "col" + x;
    // appendChild
    document.getElementById("winner_notif").style.height = '115px';

    document.getElementById("winner_notif").prepend(document.createTextNode(player_color + " wins!!!!!"));


};

var check_for_winner = (current_player_color) => {
    // credit to 4castle https://codereview.stackexchange.com/questions/127091/java-connect-four-four-in-a-row-detection-algorithms
    // for this function
    const row_length = gameState[0].length;
    const col_length = gameState.length;

    for (let row = 0; row < col_length; row++) { // iterate rows, bottom to top
        for (let col = 0; col < row_length; col++) { // iterate columns, left to right
            var player = gameState[col][row];
            if (player == EMPTY_SLOT_COLOR)
                continue; // don't check empty slots

            if (col + 3 < row_length &&
                player == gameState[col + 1][row] && // look right
                player == gameState[col + 2][row] &&
                player == gameState[col + 3][row])
                return player;
            if (row + 3 < col_length) {
                if (player == gameState[col][row + 1] && // look up
                    player == gameState[col][row + 2] &&
                    player == gameState[col][row + 3])
                    return player;
                if (col + 3 < row_length &&
                    player == gameState[col + 1][row + 1] && // look up & right
                    player == gameState[col + 2][row + 2] &&
                    player == gameState[col + 3][row + 3])
                    return player;
                if (col - 3 >= 0 &&
                    player == gameState[col - 1][row + 1] && // look up & left
                    player == gameState[col - 2][row + 2] &&
                    player == gameState[col - 3][row + 3])
                    return player;
            }
        }
    }
    return false
}



var write_move = () => {
    var s = window.location.href;
    var n = s.split('/');
    n.pop();
    var c = n.join('/');

    var theUrl = c + '/update_score';
    // the above two vars used to be arguments
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
};

var print_column_full = () => {
    // should probably also get called on mouseover, depending how its implemented
    console.log('print_column_full was called');
    return "Rwar";
};


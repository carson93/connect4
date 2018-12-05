import { end_game, check_for_winner } from './win_functions.js';
import { newGameState, createBoard, print_column_full } from './board_functions.js';

const ROWS = 6;
const COLUMNS = 7;
const EMPTY_SLOT_COLOR = "white";
const PLAYER_ONE_COLOR = "yellow";
const PLAYER_TWO_COLOR = "red";
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
    [gameState, colState, playerState] = newGameState(gameState, colState, playerState);
    AI_ON = true;
    createBoard(gameState);
    createMoves(print_column_full);
});

document.getElementById("newGameButton").addEventListener("click", function() {
    [gameState, colState, playerState] = newGameState(gameState, colState, playerState);
    AI_ON = false;
    createBoard(gameState);
    createMoves(print_column_full);
});

document.getElementById("saveGameButton").addEventListener("click", function() {
    try {
        localStorage.setItem("gameState", JSON.stringify(gameState));
        localStorage.setItem("colState", JSON.stringify(colState));
        localStorage.setItem("playerState", playerState);
        localStorage.setItem("AI_ON", String(AI_ON));
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
        playerState = localStorage.getItem("playerState");
        AI_ON = localStorage.getItem("AI_ON") === 'true';
        createBoard(gameState);
        createMoves(print_column_full);
    } catch (error) {
        console.log(error);
        alert('Game cannot be loaded');
    }
})

var createMoves = (print_column_full) => {
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


                    var winner = check_for_winner(PLAYER_ONE_COLOR, gameState, ROWS, COLUMNS, EMPTY_SLOT_COLOR);
                    if (winner) {
                        end_game(PLAYER_ONE_COLOR, COLUMNS);
                        return;
                    }

                    // start ai code if needed
                    if (AI_ON == true && playerState == PLAYER_TWO_COLOR) {
                        const I_Robot = new AI_API();
                        console.log('run ai start');
                        AI_API.run_random_ai(x, gameState.slice(0));
                    }
                    // end ai code

                } else if (playerState == PLAYER_TWO_COLOR) {

                    gameState[x][colState[x]] = PLAYER_TWO_COLOR;
                    document.getElementById("s" + x + colState[x]).style.backgroundColor = PLAYER_TWO_COLOR;
                    colState[x]++;
                    playerState = PLAYER_ONE_COLOR;


                    var winner = check_for_winner(PLAYER_TWO_COLOR, gameState, ROWS, COLUMNS, EMPTY_SLOT_COLOR);
                    if (winner) {
                        end_game(PLAYER_TWO_COLOR, COLUMNS);
                        return;
                    }
                };
            }

        });

    };
};

var write_move = () => {
    var s = window.location.href;
    var n = s.split('/');
    n.pop();
    var c = n.join('/');

    var theUrl = c + '/update_score';

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
};
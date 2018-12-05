import { end_game, check_for_winner } from './win_functions.js';
import { newGameState, createBoard, print_column_full, makeInfo, replaceTurn } from './board_functions.js';
import { saveGame, loadGame } from './save_load_game.js';

const ROWS = 6;
const COLUMNS = 7;
const EMPTY_SLOT_COLOR = "white";
const PLAYER_ONE_COLOR = "yellow";
const PLAYER_TWO_COLOR = "red";
const EMPTY_COL_STATE = [0, 0, 0, 0, 0, 0, 0];
const EMPTY_GAME_STATE = [];

var colState = EMPTY_COL_STATE.slice(0);
var gameState = EMPTY_GAME_STATE.slice(0);
var playerState = PLAYER_ONE_COLOR;
var AI_ON;

// The class that holds the AI methods
class AI_API {
    constructor() {
        this.name = "robot";
    };

    // clickColumn returns false if the column is full and the move is invalid
    static clickColumn(column_number) {
        if (colState[column_number] >= 6) {
            return false;
        } else if (document.getElementById('col' + column_number) == null) {
            return true;
        } else {
            document.getElementById('col' + column_number).click();
            return true;
        };
    };

    // Methods that represent a different AI
    // An AI that randomly selects a column to place a token
    static run_random_ai(opponent_move, board_state) {
        do {
            var AI_move = Math.floor(Math.random() * 100000) % 7;
            var valid_move = this.clickColumn(AI_move);
        } while (valid_move == false)
    };

    // An AI that copies the opponent's last move
    static run_copy_cat_ai(opponent_move, board_state) {
        do {
            var AI_move = opponent_move;
            if (valid_move == false) {
                AI_move = Math.floor(Math.random() * 100000) % 7;
            }
            var valid_move = this.clickColumn(AI_move);
        } while (valid_move == false)
    };

    // An AI that copies the opponent's last move
    static run_improved_copy_cat_ai(opponent_move, board_state) {
        valid_move = true;

        // this checks for horizontal wins and has the AI block them. 
        // You could also teach the bot to win if it saw a similar pattern with its color rather than the opponents.
        let opponent_player_color = 'yellow';
        let connect4_win = 0
        do {
            var AI_move = opponent_move;
            // checks for a win horizontally, sets opponent move if needed
            for (let row = 0; row < board_state[0].length; row++) {
                for (let column = 0; column < board_state.length; column++) {
                    console.log(board_state[column][row]);
                    console.log(opponent_move);
                    if (board_state[column][row] == opponent_player_color) {
                        connect4_win += 1;
                    }
                    else {
                        connect4_win = 0;
                    }
                    if (connect4_win >= 3) {
                        console.log('horiz winner if player plays at ');
                        if (column < 6) {
                            if (board_state[column + 1][row] == 'white') {
                                console.log('block by playing in column', column + 1)
                                AI_move = column+1;
                            }
                        }
                        if (column > 4) {
                        if (gameState[column - 4][row] == 'white')
                        {
                            AI_Move = column-4;
                        }
                    }

                    }
                }
            }
        if (valid_move == false) {
            AI_move = Math.floor(Math.random() * 100000) % 7;
        }
        var valid_move = this.clickColumn(AI_move);
    }
    while (valid_move == false)
};

// A place for you to code your own AI
static run_your_ai(opponent_move, board_state) {
    return;
};
};


// Creates a new game board using versus an AI
document.getElementById("AI_NewGame").addEventListener("click", function() {
    [gameState, colState, playerState] = newGameState(gameState, colState, playerState);
    AI_ON = true;
    createBoard(gameState);
    createMoves(print_column_full);
    makeInfo(AI_ON, playerState);
});

// Creates a new game board for two players
document.getElementById("newGameButton").addEventListener("click", function() {
    [gameState, colState, playerState] = newGameState(gameState, colState, playerState);
    AI_ON = false;
    createBoard(gameState);
    createMoves(print_column_full);
    makeInfo(AI_ON, playerState);
});

// Saves the game state to the HTML5 web storage
document.getElementById("saveGameButton").addEventListener("click", function() {
    try {
        saveGame(gameState, colState, playerState, AI_ON)
        alert('Game successfully saved');
    } catch (error) {
        console.log(error);
        alert('Game cannot be saved');
    }
})

// Loads the game state from HTML5 web storage
document.getElementById("loadGameButton").addEventListener("click", function() {
    try {
        [gameState, colState, playerState, AI_ON] = loadGame();
        createBoard(gameState);
        createMoves(print_column_full);
        document.getElementById("winner_notif").style.height = '0px';
        document.getElementById("winner_notif").innerHTML = '';
        makeInfo(AI_ON, playerState);
        var winner = check_for_winner(PLAYER_ONE_COLOR, gameState, ROWS, COLUMNS, EMPTY_SLOT_COLOR);
        if (winner) {
            end_game(winner, COLUMNS);
            return;
        }
    } catch (error) {
        console.log(error);
        alert('Game cannot be loaded');
    }
})

// Adds an event listener to every column that was created
var createMoves = (print_column_full) => {
    for (let x = 0; x < COLUMNS; x++) {
        // Changes the color of the lowest slot when mousing over over a column
        document.getElementById("col" + x).addEventListener("mouseover", function() {
            if ((document.getElementById("s" + x + colState[x])) == null) {
                print_column_full()
            } else {
                document.getElementById("s" + x + colState[x]).style.backgroundColor = "grey";
            }
        });

        // Changes the color back on mouseout
        document.getElementById("col" + x).addEventListener("mouseout", function() {
            if ((document.getElementById("s" + x + colState[x])) == null) {
                print_column_full()
            } else {
                document.getElementById("s" + x + colState[x]).style.backgroundColor = EMPTY_SLOT_COLOR;
            }
        });

        // Clicking the column drops a token to the lowest available slot and gives the turn to the next player
        document.getElementById("col" + x).addEventListener("click", function() {
            if ((document.getElementById("s" + x + colState[x])) == null) {
                print_column_full();
            } else {
                if (playerState == PLAYER_ONE_COLOR) {
                    gameState[x][colState[x]] = PLAYER_ONE_COLOR;
                    document.getElementById("s" + x + colState[x]).style.backgroundColor = PLAYER_ONE_COLOR;
                    colState[x]++;
                    playerState = PLAYER_TWO_COLOR;
                    replaceTurn(playerState);
                    write_move();

                    var winner = check_for_winner(PLAYER_ONE_COLOR, gameState, ROWS, COLUMNS, EMPTY_SLOT_COLOR);
                    if (winner) {
                        end_game(PLAYER_ONE_COLOR, COLUMNS);
                        return;
                    };

                    // Start AI if the AI is on
                    if (AI_ON == true && playerState == PLAYER_TWO_COLOR) {
                        const I_Robot = new AI_API();
                        console.log('run ai start');
                        // Change the AI function to yours here
                        AI_API.run_improved_copy_cat_ai(x, gameState.slice(0));
                    };

                } else if (playerState == PLAYER_TWO_COLOR) {
                    gameState[x][colState[x]] = PLAYER_TWO_COLOR;
                    document.getElementById("s" + x + colState[x]).style.backgroundColor = PLAYER_TWO_COLOR;
                    colState[x]++;
                    playerState = PLAYER_ONE_COLOR;
                    replaceTurn(playerState);

                    var winner = check_for_winner(PLAYER_TWO_COLOR, gameState, ROWS, COLUMNS, EMPTY_SLOT_COLOR);
                    if (winner) {
                        end_game(PLAYER_TWO_COLOR, COLUMNS);
                        return;
                    };
                };
            };
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
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
};
const ROWS = 6;
const COLUMNS = 7;
const EMPTY_SLOT_COLOR = "white";
const PLAYER_ONE_COLOR = "yellow";
const PLAYER_TWO_COLOR = "red";
const FILEPATH = 'game_save/data.json';
const EMPTY_COL_STATE = [0,0,0,0,0,0,0];
const EMPTY_GAME_STATE = [];

var colState = EMPTY_COL_STATE;
var gameState = EMPTY_GAME_STATE;
var playerState = PLAYER_ONE_COLOR;
var AI_ON;

class AI_API {
    constructor() {
        this.name = "robot";
    }

    // Adding a method to the constructor

    // static pickMove(column_number) {
    //     this.eventFire(document.getElementById('col' + column_number), 'click');
    // }

    // credit to https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
    // for this method
    // static eventFire(el, etype) {
    //     if (el.fireEvent) {
    //         el.fireEvent('on' + etype);
    //     } else {
    //         var evObj = document.createEvent('Events');
    //         evObj.initEvent(etype, true, false);
    //         el.dispatchEvent(evObj);
    //     }
    // }

    // redundant repeat of above method, simplified
    static clickColumn(column_number) {
        console.log(gameState);
        console.log(colState);
        if (colState[column_number] >= 6) {
            return false;
        } else {
            document.getElementById('col' + column_number).click();
            return true;
        }
    }

    // this is where you code your bot, each class below here is a different bot.

    // clickColumn returns false if the move is not valid

    static run_random_ai(opponent_move, board_state) {
        console.log('random ai move ');
        do {
            var AI_move = Math.floor(Math.random() * 100000) % 7;
            console.log(AI_move);
            var valid_move = this.clickColumn(AI_move);
        } while (valid_move == false)

    }
    static run_copy_cat_ai(opponent_move, board_state) {
        console.log('random ai move ');
        valid_move == true;
        do {
            var AI_move = opponent_move;
            if (valid_move == false) {
                AI_move = Math.floor(Math.random() * 100000) % 7;
            }
            console.log(AI_move);
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
    colState = [0,0,0,0,0,0,0];
    newGameState();
    playerState = PLAYER_ONE_COLOR;
    AI_ON = true;
    createBoard();
    createMoves();
});

document.getElementById("newGameButton").addEventListener("click", function() {
    colState = [0,0,0,0,0,0,0];
    newGameState();
    playerState = PLAYER_ONE_COLOR;
    AI_ON = false;
    createBoard();
    createMoves();
});

document.getElementById("saveGameButton").addEventListener("click", function() {
    try {
        localStorage.setItem("gameState", JSON.stringify(gameState));
        localStorage.setItem("colState", JSON.stringify(colState));
        alert('Game successfully saved');
    } catch(error) {
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
    } catch(error) {
        console.log(error);
        alert('Game cannot be loaded');
    }
})

var newGameState = () => {
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
                        document.getElementById("board").innerHTML = PLAYER_ONE_COLOR + " wins!!!!!";
                    }

                    // start ai code if needed
                    if (AI_ON == true && playerState == PLAYER_TWO_COLOR) {
                        // console.log('initialize AI');
                        const I_Robot = new AI_API();
                        console.log('run ai start');
                        AI_API.run_random_ai(x, []);
                    }
                    // end ai code

                } else if (playerState == PLAYER_TWO_COLOR) {

                    gameState[x][colState[x]] = PLAYER_TWO_COLOR;
                    document.getElementById("s" + x + colState[x]).style.backgroundColor = PLAYER_TWO_COLOR;
                    colState[x]++;
                    playerState = PLAYER_ONE_COLOR;
                    winner = check_for_winner(PLAYER_TWO_COLOR);
                    if (winner) {
                        document.getElementById("board").innerHTML = PLAYER_TWO_COLOR + " wins!!!!!";
                    }
                };
            }

        });
    };
};

var check_for_winner = (current_player_color) => {
    console.log('in check for win')
    if (check_horiz(current_player_color)) {
        console.log('winner! horizontal')
        return true;
    }

    if (check_vert(current_player_color)) {
        console.log('winner! vertical')
        return true;
    }
    // check_top_right_left_vert(current_player_color);
    // check_bottom_left_left_vert(current_player_color);
    // check_top_right_vert(current_player_color);
    // check_bottom_right_vert(current_player_color);
    console.log('winner check complete')
    return false
}


var check_horiz = (current_player_color) => {
    var connect4_win = 0;
    for (let row = 0; row < gameState[0].length; row++) {

        for (let column = 0; column < gameState.length; column++) {

            console.log(gameState[column][row]);
            console.log(current_player_color);
            if (gameState[column][row] == current_player_color) {
                connect4_win += 1;
                if (connect4_win >= 4) {
                    console.log('horiz winner true');
                    return true
                }
            } else {
                connect4_win = 0;
            }


        }
    }
    return false
}

var check_vert = (current_player_color) => {
    var connect4_win = 0;
    for (let column = 0; column < gameState.length; column++) {
        for (let color_index = 0; color_index < gameState[column].length; color_index++) {
            if (gameState[column][color_index] == current_player_color) {
                connect4_win += 1;
                if (connect4_win >= 4) {
                    return true
                }
            } else {
                connect4_win = 0;
            }
        }
    }
    return false;
}

var check_top_right_left_vert = (current_player_color) => {

}

var check_bottom_left_left_vert = (current_player_color) => {

}

var check_top_right_vert = (current_player_color) => {

}

var check_bottom_right_vert = (current_player_color) => {

}


var write_move = () => {

    // console.log(window.location.href);

    var s = window.location.href;
    var n = s.split('/');
    // console.log(n);
    n.pop();
    // console.log(n);
    var c = n.join('/');
    // console.log(c);

    c = c + '/update_score';

    my_window = window.open(c);
    my_window.close()
    return "Rwar";
}

var print_column_full = (column_number) => {
    // should probably also get called on mouseover, depending how its implemented
    console.log('print_column_full was called');
    return
}

// window.onbeforeunload = () => {

//     console.log(window.location.href);

//     var s = window.location.href;
//     var n = s.split('/');
//     console.log(n);
//     n.pop();
//     console.log(n);
//     var c = n.join('/');
//     console.log(c);

//     c = c + '/update_score'

//     my_window = window.open(c);
//     my_window.close()
//     return "Rwar";
// }

// var sendMovesToDatabase = () => {
//     
// }
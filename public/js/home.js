const ROWS = 6;
const COLUMNS = 7;
const EMPTY_SLOT_COLOR = "white";
const PLAYER_ONE_COLOR = "yellow";
const PLAYER_TWO_COLOR = "red";

var colState = [];
var gameState = [];
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
        if (document.getElementById('col' + column_number) == null) {
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
            var AI_move = Math.floor(Math.random() * 10000000000000000) % 8;
            console.log(AI_move);
            var valid_move = this.clickColumn(AI_move);
            console.log(valid_move);
        } while (valid_move == false)

    }
    static run_copy_cat_ai(opponent_move, board_state) {
        return

    }

    static run_your_ai(opponent_move, board_state) {
        return

    }
}





document.getElementById("AI_NewGame").addEventListener("click", function() {
    document.getElementById("board").innerHTML = "";
    colState = [];
    gameState = [];
    playerState = PLAYER_ONE_COLOR;
    AI_ON = true;
    createBoard();
    createMoves();
});

document.getElementById("newGameButton").addEventListener("click", function() {
    document.getElementById("board").innerHTML = "";
    colState = [];
    gameState = [];
    playerState = PLAYER_ONE_COLOR;
    AI_ON = false;
    createBoard();
    createMoves();
});

var createBoard = () => {
    for (let x = 0; x < COLUMNS; x++) {
        var newColumn = document.createElement("div");
        document.getElementById("board").appendChild(newColumn);

        newColumn.className = "columns";
        newColumn.id = "col" + x;

        gameState.push([]);
        colState.push(0);

        for (let y = 0; y < ROWS; y++) {
            var newSlot = document.createElement("div");
            newColumn.prepend(newSlot);

            newSlot.className = "slots";
            newSlot.id = "s" + x + y;

            gameState[x].push(EMPTY_SLOT_COLOR);
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

                    // start ai code if needed
                    if (AI_ON == true && playerState == PLAYER_TWO_COLOR) {
                        // console.log('initialize AI');
                        const I_Robot = new AI_API();
                        console.log('run ai start');
                        AI_API.run_random_ai(x);
                    }

                } else if (playerState == PLAYER_TWO_COLOR) {
                    // if the AI is off, allow the player to play both colors

                    gameState[x][colState[x]] = PLAYER_TWO_COLOR;
                    document.getElementById("s" + x + colState[x]).style.backgroundColor = PLAYER_TWO_COLOR;
                    colState[x]++;
                    playerState = PLAYER_ONE_COLOR;
                };
            }

        });
    };
};

var check_for_winner = () => {
    return
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
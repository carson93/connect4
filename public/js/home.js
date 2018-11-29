const ROWS = 6;
const COLUMNS = 7;
const EMPTY_SLOT_COLOR = "white";
const PLAYER_ONE_COLOR = "yellow";
const PLAYER_TWO_COLOR = "red";

var colState = [];
var gameState = [];
var playerState = PLAYER_ONE_COLOR;


document.getElementById("newGameButton").addEventListener("click", function() {
    document.getElementById("board").innerHTML = "";
    colState = [];
    gameState = [];
    playerState = PLAYER_ONE_COLOR;
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
            document.getElementById("s" + x + colState[x]).style.backgroundColor = "grey";
        });

        document.getElementById("col" + x).addEventListener("mouseout", function() {
            document.getElementById("s" + x + colState[x]).style.backgroundColor = EMPTY_SLOT_COLOR;
        });

        document.getElementById("col" + x).addEventListener("click", function() {

            if (playerState == PLAYER_ONE_COLOR) {
                gameState[x][colState[x]] = PLAYER_ONE_COLOR;
                document.getElementById("s" + x + colState[x]).style.backgroundColor = PLAYER_ONE_COLOR;
                colState[x]++;
                playerState = PLAYER_TWO_COLOR;
                write_move();

            } else if (playerState == PLAYER_TWO_COLOR) {
                gameState[x][colState[x]] = PLAYER_TWO_COLOR;
                document.getElementById("s" + x + colState[x]).style.backgroundColor = PLAYER_TWO_COLOR;
                colState[x]++;
                playerState = PLAYER_ONE_COLOR;
                write_move();
            };
            
        });
    };
};



var write_move = () => {

    console.log(window.location.href);

    var s = window.location.href;
    var n = s.split('/');
    console.log(n);
    n.pop();
    console.log(n);
    var c = n.join('/');
    console.log(c);

    c = c + '/update_score';

    my_window = window.open(c);
    my_window.close()
    return "Rwar";
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
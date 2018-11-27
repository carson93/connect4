var newGameButton = document.getElementById("newGameButton")

var boardRows = 6
var boardCols = 7

var colState = []
var gameState = []
var playerState = 0

newGameButton.addEventListener("click", function() {
	document.getElementById("board").innerHTML = ""
	colState = []
	gameState = []
	playerState = 0
	createBoard()
	createMoves()
})

var createBoard = () => {
	for (let x = 0; x < boardCols; x++) {
		var newColumn = document.createElement("div")
		document.getElementById("board").appendChild(newColumn)

		newColumn.className = "columns"
		newColumn.id = "col" + x

		gameState.push([])
		colState.push(0)

		for (let y = 0; y < boardRows; y++) {
			var newSlot = document.createElement("div")
			newColumn.prepend(newSlot)

			newSlot.className = "slots"
			newSlot.id = "s" + x + y

			gameState[x].push("white")
		}
	}
}

var createMoves = () => {
	for (let x = 0; x < boardCols; x++) {
		document.getElementById("col" + x).addEventListener("mouseover", function() {
			document.getElementById("s" + x + colState[x]).style.backgroundColor="grey"
		})

		document.getElementById("col" + x).addEventListener("mouseout", function() {
			document.getElementById("s" + x + colState[x]).style.backgroundColor="white"
		})

		document.getElementById("col" + x).addEventListener("click", function() {
			if (playerState == 0) {
				gameState[x][colState[x]]="yellow"
				document.getElementById("s" + x + colState[x]).style.backgroundColor="yellow"
				colState[x]++
				playerState = 1
			} else if (playerState == 1) {
				gameState[x][colState[x]]="red"
				document.getElementById("s" + x + colState[x]).style.backgroundColor="red"
				colState[x]++
				playerState = 0
			}
		})
	}
}
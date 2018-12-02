const fs = require('fs');

var saveGame = (username, gameState, filepath) => {
	if (fs.existsSync(filepath) === false){
	fs.writeFileSync(filepath, '{}');
	};

	var save_obj = {username: username, gameState: gameState}
	var str_save_obj = JSON.stringify(save_obj);
	fs.writeFileSync(filepath, str_save_obj);
}
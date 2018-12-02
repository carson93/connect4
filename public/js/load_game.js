const fs = require('fs');

var loadGame = (filepath) => {
	try {
    	var readString = fs.readFileSync(filepath);
		var resultObject = JSON.parse(readString);
		return resultObject
	} catch(error) {
    	return false
}}
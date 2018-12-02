const fs = require('fs');



var getDatabase = () => {
    try {
        if (fs.existsSync('users_database.json')) {

            var readJSON = fs.readFileSync('users_database.json');

            // read and return the inventory into a JSON
            var users_database = JSON.parse(readJSON);
        } else {
            users_database = []
        }

        return users_database

    } catch (e) {
        console.log('Error reading file. Please record this error message and contact app developer. \n')
        console.log(e);
    }
}


module.exports = { getDatabase }
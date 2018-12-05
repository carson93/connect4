const fs = require('fs');


var writeDatabase = (updated_database) => {
    try {
        var database_stringed = JSON.stringify(updated_database)
        fs.writeFileSync('users_database.json', database_stringed);
        return true
    } catch (e) {
        console.log('Error writing file. Please record this error message and contact app developer. \n')
        console.log(e);
    }
}


module.exports = { writeDatabase }
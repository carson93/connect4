const express = require('express');
const router = express.Router();
const request = require('request');
const load_database = require('./load_database');
const write_database = require('./write_database');

router.get('/update_score', (request, response) => {
	if (request.session.loggedIn)
	{
	existing_users = load_database.getDatabase();

    for (i = 0; i < existing_users.length; i++) {


        if (existing_users[i]['login'] == request.session.userName) {
            user_data_index = i;
        }
    }
    existing_users[user_data_index]["moves_made"] += 1;
    write_database.writeDatabase(existing_users);

    }

    response.send(null);
    // response.render('home.hbs', {
    // 	loggedIn: request.session.loggedIn,
    // 	user: existing_users
    // });
});

module.exports = router;
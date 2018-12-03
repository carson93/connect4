const express = require('express');
const router = express.Router();
const load_database = require('./load_database');


router.get('/home', (request, response) => {
	var existing_users = load_database.getDatabase();
    response.render('home.hbs', {
    	loggedIn: request.session.loggedIn,
    	user: existing_users
    });
});

router.get('/', (request, response) => {
	var existing_users = load_database.getDatabase();
    response.render('home.hbs', {
    	loggedIn: request.session.loggedIn,
    	user: existing_users
    });
}); 


module.exports = router;
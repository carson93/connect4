const express = require('express');
const router = express.Router();
const load_database = require('./load_database');
var existing_users = load_database.getDatabase();

router.get('/home', (request, response) => {
    response.render('home.hbs', {
    	loggedIn: request.session.loggedIn,
    	user: existing_users
    });
});

router.get('/', (request, response) => {
    response.render('home.hbs', {
    	loggedIn: request.session.loggedIn
    });
}); 


module.exports = router;
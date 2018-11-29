const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/logout', (request, response) => {
	request.session.loggedIn = false;
    response.render('home.hbs', {
    	loggedIn: request.session.loggedIn
    });
});

module.exports = router;
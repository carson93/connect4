const express = require('express');
const router = express.Router();

router.get('/home', (request, response) => {
    response.render('home.hbs', {
    	loginForm: true
    });
});

module.exports = router;
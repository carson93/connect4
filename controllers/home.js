const express = require('express');
const router = express.Router();

var app = express();

router.get('/home', (request, response) => {
    response.render('home.hbs');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { parse } = require('querystring');
const request = require('request');

router.get('/registrationForm', (request, response) => {
	response.render('registrationForm.hbs')

});

router.post('/registrationAttempt', (request, response) => {

    // credit to : https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
    // for this parsing, not sure why its necessary though.
    let registration_data = '';
    request.on('data', chunk => {
        registration_data += chunk.toString(); // convert Buffer to string
    });
    request.on('end', () => {
        // end of parsing form data
        registration_data_dict = parse(registration_data)


        console.log(registration_data_dict);

        // here is where we should save to the JSON FILE

        response.render('home.hbs', {
            loginForm: true
        })
    });
});

module.exports = router;
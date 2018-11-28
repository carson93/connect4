const express = require('express');
const router = express.Router();
const { parse } = require('querystring');
const request = require('request');

router.post('/loginAttempt', (request, response) => {
    

    // credit to : https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
    // for this parsing, not sure why its necessary though.
    let login_data = '';
    request.on('data', chunk => {
        login_data += chunk.toString(); // convert Buffer to string
    });
    request.on('end', () => {
        // end of parsing form data
        login_data_dict = parse(login_data)
        console.log(login_data_dict);
        var input_login = login_data_dict['login'];
        var input_password = login_data_dict['password'];


        // here is where the password should be hashed and compared

        // for now we should focus on reading 
        // from JSON file to compare, implementing the hashing after creating registration


        response.render('home.hbs', {
            loginForm: true
        })
    });
});

module.exports = router;
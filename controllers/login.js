const express = require('express');
const router = express.Router();
const { parse } = require('querystring');
const request = require('request');
const load_database = require('./load_database');
const bcrypt = require('bcrypt');

router.post('/loginAttempt', (request, response) => {


    // credit to : https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
    // for this parsing, not sure why its necessary though.
    let login_data = '';
    request.on('data', chunk => {
        login_data += chunk.toString(); // convert Buffer to string
    });
    request.on('end', () => {
        // end of parsing form data
        login_data_dict = parse(login_data);
        var user_data = 0;

        existing_users = load_database.getDatabase();

        for (i = 0; i < existing_users.length; i++) {


            if (existing_users[i]['login'] == login_data_dict['login']) {
                user_data = existing_users[i]
            }
        }

        // not sure this is wroking
        // user isnt in database
        if (!user_data) {
            console.log('why doesnt it render');
            response.render('registrationForm.hbs')
        }

        // database is empty
        else

        {

            bcrypt.compare(login_data_dict['password'], user_data['password']).then(function(comparison_valid) {
                if (comparison_valid) {
                    request.session.loggedIn = true;
                    request.session.userName = user_data['login'];
                    response.render('home.hbs', {
                        loggedIn: request.session.loggedIn
                    })

                } else {
                    response.render('home.hbs', {
                        loggedIn: request.session.loggedIn
                    })
                }
            })

        }
    });
});

module.exports = router;
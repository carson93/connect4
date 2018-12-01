const express = require('express');
const router = express.Router();
const { parse } = require('querystring');
const request = require('request');
const bcrypt = require('bcrypt');
const load_database = require('./load_database');
const write_database = require('./write_database');
const saltRounds = process.env.SALT || 10;

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
        registration_data_dict = parse(registration_data);



        delete registration_data_dict["password_conf"];

        existing_users = load_database.getDatabase();


        // add logic to check if the user has already registered
        // also need logic in the HTML form to prevent bad emails, not duplicate passwords, etc

        console.log(existing_users);

        bcrypt.hash(registration_data_dict['password'], saltRounds).then((hash) => {
            registration_data_dict['password'] = hash;
            registration_data_dict['moves_made'] = 0;
            existing_users.push(registration_data_dict)
            return write_database.writeDatabase(existing_users);
        }).then((result) => {
            if (result) {
                response.end('<a href=\'\/\'>Registration Complete! Click to return to connect4<\/a>');
            }
            response.end();
        }).catch((error) => {
            console.log('Something went wrong writing the database.. \n error message:', error);
        }).catch((error) => {
            console.log('Something went wrong hashing the password.. \n error message:', error);
        })



    });

});


router.get('/redirect', (request, response) => {
    response.render('home.hbs', {
        loggedIn: request.session.loggedIn
    })

});


module.exports = router;
const express = require('express');
const router = express.Router();
const { parse } = require('querystring');
const request = require('request');
const bcrypt = require('bcrypt');
const load_database = require('./load_database');
const write_database = require('./write_database');
const saltRounds = 10 | process.env.SALT;

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
        registration_data_dict = parse(registration_data);


        console.log(registration_data_dict);

        delete registration_data_dict["password_conf"];

        existing_users = load_database.getDatabase();


            // add logic to check if the user has already registered
            // also need logic in the HTML form to prevent bad emails, not duplicate passwords, etc

        console.log(existing_users);

        bcrypt.hash(registration_data_dict['password'], saltRounds).then((hash) => {
            registration_data_dict['password'] = hash;
            existing_users.push(registration_data_dict)
            return write_database.writeDatabase(existing_users);
        }).then((result) => {
            if (result) {
                response.render('home.hbs', {
                    loginForm: true
                });
            }
        }).catch((error) => {
            console.log('Something went wrong writing the database.. \n error message:', error);
        }).catch((error) => {
            console.log('Something went wrong hashing the password.. \n error message:', error);
        })


        // here is where we should save to the JSON FILE

        response.render('home.hbs', {
            loginForm: true
        })
    });
});


module.exports = router;
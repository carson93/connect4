const express = require('express');
const router = express.Router();
const { parse } = require('querystring');
const request = require('request');
const bcrypt = require('bcrypt');
const load_database = require('./load_database');
const write_database = require('./write_database');
const saltRounds = process.env.SALT || 10;

router.get('/registrationForm', (request, response) => {
    response.render('registrationForm.hbs', {
        formData_error: false,
        nameIsNotValid: false,
        duplicateName: false,
        passIsNotValid: false,
        passMatches: false,
        emailIsNotValid: false
    })

});

router.post('/registrationAttempt', (request, response) => {

    var registration_data_dict = request.body;
    var existing_users = load_database.getDatabase();
    
    var form_missing = (Object.keys(registration_data_dict).length != 4);
    var invalid_name = (!validateName(registration_data_dict['login']));
    var valid_pass = (!validateName(registration_data_dict['password']));
    var passes_match = (registration_data_dict['password'] != registration_data_dict['password_conf']);
    var valid_email = (!validateEmail(registration_data_dict['email']));
    var duplicate_login = (check_duplicate_user(registration_data_dict["login"], existing_users));

    if (form_missing || invalid_name || valid_pass || passes_match || valid_email || duplicate_login) {
        response.set('Content-Type', 'text/html');
        response.render('registrationForm.hbs', {
            formData_error: form_missing,
            nameIsNotValid: invalid_name,
            duplicateName: duplicate_login,
            passIsNotValid: valid_pass,
            passMatches: passes_match,
            emailIsNotValid: valid_email
        })
    } 
    else {

        delete registration_data_dict["password_conf"];


        bcrypt.hash(registration_data_dict['password'], saltRounds).then((hash) => {
            registration_data_dict['password'] = hash;
            registration_data_dict['moves_made'] = 0;
            existing_users.push(registration_data_dict)
            return write_database.writeDatabase(existing_users);
        }).then((result) => {
            if (result) {
                request.session.loggedIn = true;
                    request.session.userName = registration_data_dict['login'];
                    request.session.usersDatabase = existing_users;
                    response.render('home.hbs', {
                        loggedIn: request.session.loggedIn,
                        user: request.session.usersDatabase
                    })
            }
        }).catch((error) => {
            console.log('Something went wrong writing the database.. \n error message:', error);
        }).catch((error) => {
            console.log('Something went wrong hashing the password.. \n error message:', error);
        })
    }

});

var check_duplicate_user = (new_user_name, existing_users_dict) => {
    for (let i = 0; i < existing_users_dict.length; i++) {
        if (existing_users_dict == []) {
            return false;
        }

        if (new_user_name == existing_users_dict[i]['login']) {
            return true;
        }
    }

    return false;
}


var validateName = (word_string) => {
    var valid = /^[a-z0-9]+$/i;
    result = valid.test(word_string);
    return result;
}


var validateEmail = (email) => {
    var valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    result = valid.test(email);
    return result;
}

// // this does nothing
router.get('/redirect', (request, response) => {
    response.render('home.hbs', {
        loggedIn: request.session.loggedIn
    })

});


module.exports = router;
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

    // credit to : https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
    // for this parsing, not sure why its necessary though.

    var registration_data_dict = request.body;
    var existing_users = load_database.getDatabase();

    console.log('valid email', validateEmail(registration_data_dict['email']));
    console.log('valid email [TEST]', validateEmail('testemail@gmail.com'));

    var form_missing = (Object.keys(registration_data_dict).length != 4);
    var invalid_name = (!validateName(registration_data_dict['login']));
    if (form_missing || invalid_name) {
        response.set('Content-Type', 'text/html');
        response.render('registrationForm.hbs', {
            formData_error: form_missing,
            nameIsNotValid: false,
            duplicateName: false,
            passIsNotValid: false,
            passMatches: false,
            emailIsNotValid: false
        })
    } else if (!validateName(registration_data_dict['password'])) {
        response.set('Content-Type', 'text/html');
        response.render('registrationForm.hbs', {
            formData_error: false,
            nameIsNotValid: false,
            duplicateName: false,
            passIsNotValid: true,
            passMatches: false,
            emailIsNotValid: false
        })

    } else if (registration_data_dict['password'] != registration_data_dict['password_conf']) {
        response.set('Content-Type', 'text/html');
        response.render('registrationForm.hbs', {
            formData_error: false,
            nameIsNotValid: false,
            duplicateName: false,
            passIsNotValid: false,
            passMatches: true,
            emailIsNotValid: false
        })

    } else if (!validateEmail(registration_data_dict['email'])) {
        response.set('Content-Type', 'text/html');
        response.render('registrationForm.hbs', {
            formData_error: false,
            nameIsNotValid: false,
            duplicateName: false,
            passIsNotValid: false,
            passMatches: false,
            emailIsNotValid: true
        })
    } else if (check_duplicate_user(registration_data_dict["login"], existing_users)) {
        response.set('Content-Type', 'text/html');
        response.render('registrationForm.hbs', {
            formData_error: false,
            nameIsNotValid: false,
            duplicateName: true,
            passIsNotValid: false,
            passMatches: false,
            emailIsNotValid: false
        })
    } else {

        delete registration_data_dict["password_conf"];




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
                response.render('home.hbs', {
                    loggedIn: false
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
    for (let i = 0; i > existing_users_dict.length; i++) {
        if (existing_users_dict == []) {
            return false;
        }

        if (new_user_name == existing_users_dict[i]['name']) {
            return true;
        }
    }

    return false;
}


var validateName = (word_string) => {
    var valid = /^[a-z0-9]+$/i;
    result = valid.test(word_string);
    console.log('name is: ', result);
    return result;


}


var validateEmail = (email) => {
    // return typeof str==='string' && /^[\w+\d+._]+\@[\w+\d+_+]+\.[\w+\d+._]{2,8}$/.test(str);
    var valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    result = valid.test(email);
    console.log('email is: ', result);
    return result;
}

// // this doesnt nothing
router.get('/redirect', (request, response) => {
    response.render('home.hbs', {
        loggedIn: request.session.loggedIn
    })

});


module.exports = router;
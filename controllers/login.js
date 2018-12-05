const express = require('express');
const router = express.Router();
const { parse } = require('querystring');
const request = require('request');
const load_database = require('./load_database');
const bcrypt = require('bcrypt');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });


// router.post('/loginAttempt', )

router.post('/loginAttempt', (request, response) => {
    var login_data_dict = request.body;
        var user_data = 0;

        existing_users = load_database.getDatabase();

        for (i = 0; i < existing_users.length; i++) {


            if (existing_users[i]['login'] == login_data_dict['login']) {
                user_data = existing_users[i]
            }
        }

        // not sure this is wroking
        // user isnt in database
        if (!user_data || existing_users == []) {
            console.log('please register');
            response.render('registrationForm.hbs', {
            formData_error: false,
            nameIsNotValid: false,
            duplicateName: false,
            passIsNotValid: false,
            passMatches: false,
            emailIsNotValid: false
        })
        }
        else

        {

            bcrypt.compare(login_data_dict['password'], user_data['password']).then(function(comparison_valid) {
                if (comparison_valid) {
                    request.session.loggedIn = true;
                    request.session.userName = user_data['login'];
                    request.session.usersDatabase = existing_users;
                    response.render('home.hbs', {
                        loggedIn: request.session.loggedIn,
                        user: request.session.usersDatabase
                    })

                } else {
                    var users = {users:existing_users};
                    response.render('home.hbs', {
                        loggedIn: request.session.loggedIn
                    })
                }
            })

        }
});

module.exports = router;
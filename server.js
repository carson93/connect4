const express = require('express');
const homeRouter = require('./controllers/home');
const bcrypt = require('bcrypt');
const hbs = require('hbs');
const request = require('request');
// const cookieSession = require('cookie-session')
const { parse } = require('querystring');
// const fun = require('./server_functions.js');


var app = express();


// // makes a cookie middleware.. not used right now
// // needs the require cookieSession to work
// app.use(cookieSession({
//   name: 'connect4_session',
//   keys: [ 'idontknowwhatthisisfor'],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))


// directories
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');




// route to homepage
// wtf is homeRouter? I understand its under controllers but we never used that?
// app.get('/', homeRouter);
app.get('/', (request, response) => {
    response.render('home.hbs', {
        loginForm: true
    })
});


app.post('/loginAttempt', (request, response) => {
    

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

app.get('/registrationForm', (request, response) => {
	response.render('registrationForm.hbs')

});

app.post('/registrationAttempt', (request, response) => {

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


// start server
app.listen(process.env.PORT || 8080, () => {
    console.log('Server is up on the port 8080');
});
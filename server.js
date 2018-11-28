const express = require('express');
const homeRouter = require('./controllers/home');
const loginRouter = require('./controllers/login');
const registerRouter = require('./controllers/register');
const bcrypt = require('bcrypt');
const hbs = require('hbs');
// const cookieSession = require('cookie-session')
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
app.use('/', homeRouter);

app.use('/', loginRouter);

app.use('/', registerRouter);

// start server
app.listen(process.env.PORT || 8080, () => {
    console.log('Server is up on the port 8080');
});
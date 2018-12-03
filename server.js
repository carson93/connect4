const express = require('express');
const homeRouter = require('./controllers/home');
const loginRouter = require('./controllers/login');
const registerRouter = require('./controllers/register');
const logOutRouter = require('./controllers/logout');
const newGameRouter = require('./controllers/new_game');
const bodyParser = require('body-parser');
const getMovesRouter = require('./controllers/get_moves');

const hbs = require('hbs');
var cookieSession = require('cookie-session')
// const fun = require('./server_functions.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

// makes a cookie middleware.. not used right now
// needs the require cookieSession to work
app.use(cookieSession({
  name: 'connect4_session',
  keys: [ 'idontknowwhatthisisfor'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


// this might let us use request.body..
app.use(bodyParser.urlencoded({
    extended: true
}));




// directories
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');




// route to homepage
app.use('/', homeRouter);

app.use('/', loginRouter);

app.use('/', registerRouter);

app.use('/', logOutRouter);
app.use('/', newGameRouter);
app.use('/', getMovesRouter);

// start server
var server_host = process.env.YOUR_HOST || '0.0.0.0';
const port = process.env.PORT || 8080;
app.listen(port, server_host, () => {
	console.log('Server is up on port 8080');
})
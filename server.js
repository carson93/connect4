const express = require('express');
const hbs = require('hbs');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const homeRouter = require('./controllers/home');
const loginRouter = require('./controllers/login');
const registerRouter = require('./controllers/register');
const logOutRouter = require('./controllers/logout');
const getMovesRouter = require('./controllers/get_moves');

var app = express();

// makes a cookie middleware
// needs the require cookieSession to work
app.use(cookieSession({
  name: 'connect4_session',
  keys: [ 'idontknowwhatthisisfor'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// directories
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

// route to homepage
app.use('/', homeRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', logOutRouter);
app.use('/', getMovesRouter);

// start server
var server_host = process.env.YOUR_HOST || '0.0.0.0';
const port = process.env.PORT || 8080;
app.listen(port, server_host, () => {
	console.log('Server is up on port 8080');
})
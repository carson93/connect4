const express = require('express');
const homeRouter = require('./controllers/home');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.use('/', homeRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is up on the port 8080');
});
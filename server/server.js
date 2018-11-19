const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/router.js')

//set up express module for use
const app = express();

//use cors
app.use(cors('*'));

//load config files
dotenv.config();

//set port web server listrns to according to environment
const port = 9090 || process.env.PORT;

//use logger module
app.use(logger('dev'));

//parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/',routes);

 
//port listener
app.listen(port,() => {
	console.log(`app started at port ${port}`);
});
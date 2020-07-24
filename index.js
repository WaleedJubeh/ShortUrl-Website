const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
require('./src/db/connection');
require('./src/hbs/slug-to-url');
require('dotenv/config');

const app = express();
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`) );
app.use('/', require('./src/routes/index'));

console.log("Listen to ", process.env.PORT || 3000);

app.listen(process.env.PORT || 3000);
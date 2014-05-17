var express = require('express');
var app = express();

// CONTRIBUTED MIDDLEWARE
var serveStatic = require('serve-static');
app.use(serveStatic('public', {'index': ['index.html']}));
var bodyParser = require('body-parser');
app.use(bodyParser());

// ROUTES
app.use('/wines', require('./server/routes/wines'));

app.listen(3000);

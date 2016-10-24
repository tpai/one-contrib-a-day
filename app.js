var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').createServer(app);
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.post('/', require('./src/route.js'));

http.listen(port, function() {
    console.log('Listening to port ' + port + '...');
});

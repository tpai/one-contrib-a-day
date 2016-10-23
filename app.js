require("dotenv").config();

var GITHUB_OAUTH_TOKEN = process.env.GITHUB_OAUTH_TOKEN;
var GITHUB_OWNER = process.env.GITHUB_OWNER;
var GITHUB_REPO = process.env.GITHUB_REPO;
var SLACK_WEBHOOKURI = process.env.SLACK_WEBHOOKURI;
var issueUrl = 'http://github.com/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/issues';

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

var GitHubApi = require("github");
var github = new GitHubApi();

var Slack = require('slack-node');
var slack = new Slack();
slack.setWebhook(SLACK_WEBHOOKURI);

app.post('/', function(req, res) {
    github.authenticate({
        type: 'oauth',
        token: GITHUB_OAUTH_TOKEN
    });

    github.issues.create({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        title: req.body.text.replace('ocad ', '')
    });

    slack.webhook({
        channel: '#ocad',
        username: 'OCAD_BOT',
        text: 'One contribution a day! (' + issueUrl + ')'
    }, function(err, response) {
       console.log(req.body.user_name + ': ' + req.body.text);
    });

    res.sendStatus(200);
});

http.listen(port, function() {
    console.log('LISTENING TO PORT ' + port);
});

require("dotenv").config();

var SLACK_WEBHOOKURI = process.env.SLACK_WEBHOOKURI;

var issueUrl = require('./github.js').issueUrl;
var Slack = require('slack-node');
var slack = new Slack();
slack.setWebhook(SLACK_WEBHOOKURI);

module.exports = {
    successMessage: function(text) {
        slack.webhook({
            channel: '#ocad',
            username: 'One Contribution A Day',
            text: 'Keep empty gray away! (' + issueUrl + ')'
        }, function(err, response) {
           console.log(req.body.user_name + ': ' + req.body.text);
        });
    }
}

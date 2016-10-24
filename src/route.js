var github = require('./github.js');
var slack = require('./slack.js');

function route(req, res) {
    github.createIssue({
        title: req.body.text.replace('ocad ', '')
    });
    slack.successMessage();
    res.sendStatus(200);
}

module.exports = route;

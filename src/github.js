require("dotenv").config();

var GITHUB_OAUTH_TOKEN = process.env.GITHUB_OAUTH_TOKEN;
var GITHUB_OWNER = process.env.GITHUB_OWNER;
var GITHUB_REPO = process.env.GITHUB_REPO;

var issueUrl = 'http://github.com/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/issues';

var GitHubApi = require("github");
var github = new GitHubApi();

module.exports = {
    issueUrl,
    createIssue: function(issue) {
        github.authenticate({
            type: 'oauth',
            token: GITHUB_OAUTH_TOKEN
        });

        github.issues.create({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            title: issue.title
        });
    }
};

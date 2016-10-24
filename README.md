# One Contribution A Day

Keep empty gray away.

## Usage

1. Create [personal access token](https://github.com/settings/tokens) with repo scope.

2. Integrate slack incoming webhook to specific channel #ocad.

3. Fill up .env file.

```
GITHUB_OAUTH_TOKEN=[TOKEN_FROM_1ST_STEP]
GITHUB_OWNER=[TARGET_REPO_OWNER]
GITHUB_REPO=[TARGET_REPO_NAME]
SLACK_WEBHOOKURI=[URI_FROM_2ND_STEP]
```

4. Deploy app to heroku host, and get the app url.

5. Integrate slack outgoing webhook, once event triggered it'll post payload to app then do things.

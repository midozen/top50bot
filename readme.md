# THIS PROJECT IS NOW DEPRECATED!!! LOOK OUT FOR A REWRITE OF THIS CODEBASE

# Osu Top 50 Twitter Bot

## What is this?
This is a twitter bot for osu! that checks the [ranked leaderboard](https://osu.ppy.sh/rankings/osu/performance) every 30 seconds to see if any player has gained or lost rank.

## Setup
- Clone the repository
- run `npm i` in the root directory
- make a new file called `config.json` and set-up like this
```
{
    "debug": false,
    "twitter" : {
        "consumer_key": YOUR_CONSUMER_KEY",
        "consumer_secret": "YOUR_CONSUMER_SECRET",
        "access_token": "YOUR_ACCESS_TOKEN",
        "access_token_secret": "YOUR_ACCESS_TOKEN_SECRET"
    },
    "osu" : {
        "client_id": "YOUR_CLIENT_ID",
        "client_secret": "YOUR_CLIENT_SECRET"
    }
}
```
- Lastly, run `npm run start` and you're done!

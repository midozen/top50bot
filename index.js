
const { getToken, getRankings } = require('./utils/osu');
const compareLeaderboard = require('./utils/compareleaderboard');
const logData = require('./utils/logdata');

const config = require('./config.json');

const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi(config.twitter);

let oldLeaderboard = [];

async function loop() {
  // if there is no old leaderboard, get the leaderboard
  if (oldLeaderboard.length === 0) {
    const token = await getToken();
    oldLeaderboard = await getRankings(token);
  }

  const token = await getToken();
  const temp = await getRankings(token);

  const changes = compareLeaderboard(oldLeaderboard, temp);


  if (changes) {

    console.log(`There's a change!`)

    // if debug is on tweet, if not dont

    if (config.debug) {
      console.log(changes)
      logData(oldLeaderboard, temp);
    }
    else {
      await client.v2.tweet(changes)
    }

    oldLeaderboard = temp;
  } else {
    console.log('No changes');
  }
}

setInterval(loop, 1000 * 30 * 1); // tweet every 30 seconds
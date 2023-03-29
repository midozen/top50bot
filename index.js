const twit = require('twit');

const { getToken, getRankings } = require('./utils/osu');
const compareLeaderboard = require('./utils/compareleaderboard');
const logData = require('./utils/logdata');

const config = require('./config.json');

const T = new twit(config.twitter);

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
      const tweet = {
        status: changes
      }

      // tweet and check for error
      T.post('statuses/update', tweet, (err, data, response) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Tweeted: ' + changes);
        }
      });
    }

    oldLeaderboard = temp;
  } else {
    console.log('No changes');
  }
}

setInterval(loop, 1000 * 30 * 1); // tweet every 30 seconds
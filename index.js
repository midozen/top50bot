const twit = require('twit');

const getLeaderboard = require('./utils/getleaderboard');
const compareLeaderboard = require('./utils/compareleaderboard');

const config = require('./config.json');

const T = new twit(config.twitter);

let oldLeaderboard = [];

async function loop() {
  if (oldLeaderboard.length === 0) {
    oldLeaderboard = await getLeaderboard();
  }

  const temp = await getLeaderboard();

  const changes = compareLeaderboard(oldLeaderboard, temp);


  if (changes) {

    console.log(`There's a change!`)

    const tweet = {
      status: changes
    }

    //tweet and check for error
    T.post('statuses/update', tweet, (err, data, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Tweeted: ' + changes);
      }
    })

    oldLeaderboard = temp;
  } else {
    console.log('No changes');
  }
}

setInterval(loop, 1000 * 30 * 1); // tweet every 30 seconds
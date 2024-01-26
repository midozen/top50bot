
const { getToken, getRankings } = require('./utils/osu');
const compareLeaderboard = require('./utils/compareleaderboard');

const config = require('./config.json');
const axios = require('axios');

let oldLeaderboard = [];

async function loop() {
  if (oldLeaderboard.length === 0) {
    const token = await getToken();
    oldLeaderboard = await getRankings(token);
  }

  const token = await getToken();
  const temp = await getRankings(token);

  const changes = compareLeaderboard(oldLeaderboard, temp);

  if (changes) {
    console.log(`There's a change!`)

    axios.post(config.discord.webhookURL, {
      "content": null,
      "embeds": [
        {
          "title": "Somebody has changed in rank!",
          "description": changes,
          "color": 6470519,
          "author": {
            "name": "Osu! Top 50 Updates"
          },
          "footer": {
            "text": "Automated by Fexlar",
            "icon_url": "https://avatars.githubusercontent.com/u/122419606"
          },
          "timestamp": new Date().toISOString()
        }
      ],
      "attachments": []
    });

    oldLeaderboard = temp;
  }
}

setInterval(loop, 1000 * 3);
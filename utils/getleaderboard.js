const axios = require('axios');
const cheerio = require('cheerio');

const getLeaderboard = async () => {
    try {
        const siteUrl = 'https://osu.ppy.sh/rankings/osu/performance';

        const { data } = await axios({
            method: 'GET',
            url: siteUrl,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
            }
        });


        const $ = cheerio.load(data);
        const elemSelector = '#scores > div > table > tbody > tr';

        const keys = ['rank', 'name', 'accuracy', 'playcount', 'performance', 'ss', 's', 'a'];
        const leaderboard = [];

        $(elemSelector).each((i, elem) => {
            const row = {};
            let keyIdx = 0;

            $(elem).children().each((i, elem) => {
                const tdValue = $(elem).text();

                if (tdValue) {
                    row[keys[keyIdx]] = tdValue.trim();
                    keyIdx++;
                }
            });

            leaderboard.push(row);
        });

        return leaderboard;
    }
    catch (error) {
        console.error(error);
        return false
    }
}

module.exports = getLeaderboard;

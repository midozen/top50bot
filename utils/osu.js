const config = require('../config.json');
const axios = require('axios');


const getToken = async () => {
    // curl --request POST \
    // "https://osu.ppy.sh/oauth/token" \
    // --header "Accept: application/json" \
    // --header "Content-Type: application/x-www-form-urlencoded" \
    // --data "client_id=1&client_secret=clientsecret&grant_type=client_credential

    try {
        const { data } = await axios({
            method: 'POST',
            url: 'https://osu.ppy.sh/oauth/token',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: `client_id=${config.osu.client_id}&client_secret=${config.osu.client_secret}&grant_type=client_credentials&scope=public`
        });

        return data.access_token;
    }
    catch (error) {
        console.error(error.response.data);
        return false;
    }
}

const getRankings = async (token) => {
    // curl --request GET \
    // --get "https://osu.ppy.sh/api/v2/rankings/osu/performance" \
    // --header "Content-Type: application/json" \
    // --header "Accept: application/json"

    try {
        const { data } = await axios({
            method: 'GET',
            url: 'https://osu.ppy.sh/api/v2/rankings/osu/performance',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // return data;
        // only return the first 50
        return data.ranking.slice(0, 50);
    }
    catch (error) {
        console.error(error.response.data);
        return false;
    }
}

module.exports = {
    getToken,
    getRankings
}

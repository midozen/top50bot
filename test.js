const axios = require('axios');

const data = {
  value1: 'test'
};

const {datar } = axios.post('https://maker.ifttt.com/trigger/blue/with/key/dLdlJwbxpq82jnO1_1WwL3', data, {
  headers: {
    'Content-Type': 'application/json'
  }
});

console.log(datar)

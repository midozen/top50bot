// make js file with old data and new data and the current date is the file name

// Path: utils\logdata.js

const path = require('path');
const fs = require('fs');

const logData = (oldData, newData) => {

    const date = new Date();
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().substr(-2);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const timezone = 'UTC';

    const fileName = `${month}-${day}-${year}-${hour}-${minute}-${timezone}.js`;

    if (!fs.existsSync(path.join(__dirname, '..', 'data'))) {
        fs.mkdirSync(path.join(__dirname, '..', 'data'));
    }

    fs.writeFile(path.join(__dirname, '..', 'data', fileName), JSON.stringify({
        oldData,
        newData
    }), (err) => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = logData;
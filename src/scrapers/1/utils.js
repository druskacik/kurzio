const axios = require('axios');

// const headers = require('./headers.json');
const HEADERS = require('../../data/test-headers.json');

const getSessionID = async () => {
    try {
        const response = await axios.get('https://tipsport.sk');
        const headers = response.headers;
        let sessionID = headers['set-cookie'][0];
        sessionID = sessionID.split(';')[0];
        sessionID = sessionID.split('=')[1];
        return sessionID
    } catch (err) {
        throw err;
    }
}

const getHeaders = async () => {
    try {
        let headers = HEADERS
        const sessionID = await getSessionID();
        headers['Cookie'] = headers['Cookie'].replace('@PLACEHOLDER', sessionID);
        return headers;
    } catch (err) {
        throw err;
    }
}

module.exports = getHeaders;
const axios = require('axios');

// const headers = require('./headers.json');
const HEADERS = require('../data/test-headers.json');

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

const getHeaders = async (headers) => {
  try {
    const sessionID = await getSessionID();
    headers['Cookie'] = headers['Cookie'].replace('@PLACEHOLDER', sessionID);
    return headers;
  } catch (err) {
    throw err;
  }
}

const getOdds = async (url) => {
  try {
    const headers = await getHeaders(HEADERS);
    const response = await axios.get(url, {
      headers,
    });
    const options = response.data.eventTables[0].boxes[0].cells;
    return options;
  } catch (err) {
    throw err;
  }
}

module.exports = getOdds;
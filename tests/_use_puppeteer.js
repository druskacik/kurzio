const puppeteer = require('puppeteer');

const fetchFromNetworkTab = require('../src/scrapers/1/fetch-from-network-tab');

const test = async () => {

    // const baseUrl = 'https://www.tipsport.sk/kurzy/tenis-43';
    // const targetJSONUrl = 'https://www.tipsport.sk/rest/offer/v2/offer?limit=75';

    const baseUrl = 'https://www.tipsport.sk';
    const targetJSONUrl = 'https://www.tipsport.sk/rest/offer/v5/sports?fromResults=false'

    const response = await fetchFromNetworkTab(baseUrl, targetJSONUrl);
    console.log('Response:', response);

}

test();
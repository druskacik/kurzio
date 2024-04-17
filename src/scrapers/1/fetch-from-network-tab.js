const puppeteer = require('puppeteer');

const fetchFromNetworkTab = async (baseUrl, targetJSONUrl) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox'],
        });

        const response = await new Promise(async (resolve, reject) => {
            const page = await browser.newPage();
            await page.setRequestInterception(true);

            page.on('request', (request) => {
                if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
                    request.abort();
                } else {
                    request.continue();
                }
            });

            let responseBody = null;

            page.on('response', async (response) => {
                const url = response.url();
                const status = response.status();
                const contentType = response.headers()['content-type'];

                if (url === targetJSONUrl && status === 200 && contentType.includes('application/json')) {
                    responseBody = await response.json();
                }
            });

            await page.goto(baseUrl, { waitUntil: 'networkidle2' });
            resolve(responseBody);
        });

        return response;
    } catch (error) {
        console.error('Error fetching from network tab:', error);
        throw error; // Rethrow the error to be handled by the caller
    } finally {
        await browser.close();
    }
};

module.exports = fetchFromNetworkTab;

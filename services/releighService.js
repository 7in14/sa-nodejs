'use strict';

const Request = require('async-request');
const releighDataUrl = 'https://data.raleighnc.gov/resource/3bhm-we7a.json';

const service = {
    async getCrimeData(query) {
        let fullUrl = `${releighDataUrl}${query}`;
        let result = await Request(fullUrl);

        return JSON.parse(result.body);
    }
}

module.exports = service;
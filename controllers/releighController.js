'use strict';

const releighService = require('../services/releighService');

exports.getCrimeData = async (request, response) => {
    try {

        var result = await releighService.getCrimeData(request.url.search || '');

        response(result);
    } catch (error) {
        console.log(error);
        respose('Internal Server Error').code(500);
    }
}
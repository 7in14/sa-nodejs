'use strict';

const repository = require('../repository/dataSource').repository;
const _ = require('lodash');
const request = require('async-request');
const urlChecker = require('../utils/urlChecker');

exports.getAll = async (request, response) => {

    try{

        let urls = await getAllUrls();  
        response(urls);
    }catch(error){
        console.log(error);
        respose('Internal Server Error').code(500);
    }
};

exports.dataSources = async (request, response) => {

    let result = await repository.getAll();
    response(result);
};

exports.getById = async (request, response) => {

    try {
        let result = await repository.getById(request.params.id);

        if (result) {
            response(result);
        } else {
            response('Data source not found').code(404)
        }
    }
    catch (err) {
        console.log(err);
        respose('Internal Server Error').code(500);
    }
};

exports.addNotifier = async (request, response) => {

    try {
        if (_.isPlainObject(request.payload)) {
            let result = await repository.addNotifier(request.payload);
            response('Notifier added').code(201);
        } else {
            response('Invalid notifier format').code(400)
        }
    } catch (error) {
        console.log(error);
        respose('Internal Server Error').code(500);
    }
}

exports.deleteNotifier = async (request, response) => {
    try {
        var notifierId = request.params.id;
        if(!notifierId){
            let errorMessage = 'Invalid Notifier Id';

            console.log(errorMessage);
            response(errorMessage).code(400);
            return;
        }

        let result = await repository.deleteNotifier(notifierId);
        if(result.isSuccess){
            response(result.remainingItems).code(202);
        }else{
            response(`Notifier with id: ${notifierId} not found`).code(404);
        }
        
    } catch(error){
        console.log(error);
        respose('Internal Server Error').code(500);
    }
}

async function getAllUrls() {

    let result = await repository.getAll();
    let urls = _(result).map('url').filter(url => urlChecker.isValidUrl(url)).value();
    let responses = await getDataByUrl(urls);
    return responses;
}

async function getDataByUrl(urls) {
    let responses = [];
    for (let url of urls) {
        var response = await request(url);

        if (response && _.isArray(response.body)) {
            responses = responses.concat(response.body);
        } else {
            responses.push(JSON.parse(response.body));
        }
    }

    return responses;
}
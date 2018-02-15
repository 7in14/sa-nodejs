'use strict';

const repository = require('../repository/dataSource').repository;
const _ = require('lodash');
const request = require('async-request');

exports.getAll = async (request, response) => {
    
    getAllUrls(function(urls){
        response(urls);
    });  
};

exports.dataSources = async (request, response) => {
    
    let result = await repository.getAll();
    response(result);
};

exports.getById = async (request, response) => {
    
    try{
        let result = await repository.getById(request.params.id);

        if(result){
            response(result);
        }else{
            response('Data source not found');
        }    
    }
    catch(err){
        console.log(err);
    }    
};

async function getAllUrls(callback){
    
    let result = await repository.getAll();
    let urls = _.map(result, 'url');
    let responses = await getDataByUrl(urls);
    callback(responses);
}

async function getDataByUrl(urls){
    let responses = [];
    for(let url of urls) {
        var response = await request(url);
       
        if(response && _.isArray(response.body)){
            responses = responses.concat(response.body);
        }else{
            responses.push(JSON.parse(response.body));
        }   
    }

    return responses;
}

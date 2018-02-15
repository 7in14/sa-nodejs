'use strict';

const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const connectionStrings = require('../utils/connectionStrings');
const collectionName = 'pk_7in14';
const _ = require('lodash');

const repository = {
    async getAll(){
        let db = await mongoClient.connect(connectionStrings.cosmosDb);
        let collection = db.collection(collectionName);
        let allRecords = await collection.find().toArray();

        db.close();

        return allRecords;
    },
    async getById(id){
        let db = await mongoClient.connect(connectionStrings.cosmosDb);
        let collection = db.collection(collectionName);
        let item = null;
        if(ObjectId.isValid(id)){
            item = await collection.findOne(ObjectId(id));
        }

        db.close();

        return item;
    }
};

exports.repository = repository;
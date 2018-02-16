'use strict';

const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const connectionStrings = require('../utils/connectionStrings');
const collectionName = 'dataSource';
const _ = require('lodash');

const repository = {
    async getAll() {
        let db = await mongoClient.connect(connectionStrings.cosmosDb);
        let collection = db.collection(collectionName);
        let allRecords = await collection.find().toArray();

        db.close();

        return allRecords;
    },
    async getById(id) {
        let db = await mongoClient.connect(connectionStrings.cosmosDb);
        let collection = db.collection(collectionName);
        let item = null;
        if (ObjectId.isValid(id)) {
            item = await collection.findOne(ObjectId(id));
        }

        db.close();

        return item;
    },
    async addNotifier(notifier) {
        let db = await mongoClient.connect(connectionStrings.cosmosDb);
        let collection = db.collection(collectionName);

        var result = await collection.insertOne(notifier);
        db.close();

        console.log('Added');
    },
    async deleteNotifier(notifierId) {
        let db = await mongoClient.connect(connectionStrings.cosmosDb);
        let collection = db.collection(collectionName);
        let deletionResult = {
            isSuccess: false,
            remainingItems: []
        };
        
        if (ObjectId.isValid(notifierId)) {
            var result = await collection.deleteOne({ _id: ObjectId(notifierId) });
            console.log('Deletion result:', result.deletedCount);
            if(result.deletedCount === 1){
                deletionResult.isSuccess = true;
                deletionResult.remainingItems = await collection.find().toArray();
            }
            
            return deletionResult;
        } else {
            return deletionResult;
        }

    }
};

exports.repository = repository;
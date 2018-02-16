'use strict';

const Hapi = require('hapi');
const Pinger = require('./utils/pinger');
const mongoController = require('./controllers/mongoController');
const releighController = require('./controllers/releighController');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

const setupServer = () => {

    const server = new Hapi.Server();

    server.connection({
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000
    });

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: '1.0.0',
        },
    };

    server.register([
        Inert,
        Vision,
        {
            'register': HapiSwagger,
            'options': swaggerOptions
        }
    ]);

    server.route({
        method: 'GET',
        path: '/ping',
        config: { tags: ['api'] },        
        handler: function (request, reply) {

            const pong = Pinger.sayPong();
            reply(`You say ping, I say ${pong}!`);
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        config: { tags: ['api'] },   
        handler: function (request, reply) {

            reply(`Default route`);
        }
    });

    server.route({
        method: 'GET',
        path: '/allData',
        config: { tags: ['api'] },   
        handler: mongoController.getAll
    });

    server.route({
        method: 'GET',
        path: '/dataSources',
        config: { tags: ['api'] },   
        handler: mongoController.dataSources
    });

    server.route({
        method: 'GET',
        path: '/dataSource/{id}',
        config: { tags: ['api'] },   
        handler: mongoController.getById
    });

    server.route({
        method: 'PUT',
        path: '/dataSource',
        config: { tags: ['api'] },   
        handler: mongoController.addNotifier
    });

    server.route({
        method: 'DELETE',
        path: '/dataSource/{id}',
        config: { tags: ['api'] },   
        handler: mongoController.deleteNotifier
    });

    server.route({
        method: 'GET',
        path: '/releigh/crime',
        config: { tags: ['api'] },   
        handler: releighController.getCrimeData
    });

    return server;
};

module.exports = setupServer;

'use strict';

const Hapi = require('hapi');
const Pinger = require('./utils/pinger');
const mongoController = require('./controllers/mongoController');

const setupServer = () => {

    const server = new Hapi.Server();

    server.connection({
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000
    });

    server.route({
        method: 'GET',
        path: '/ping',
        handler: function (request, reply) {

            const pong = Pinger.sayPong();
            reply(`You say ping, I say ${pong}!`);
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply(`Default route`);
        }
    });

    server.route({
        method: 'GET',
        path: '/allData',
        handler: mongoController.getAll
    });

    server.route({
        method: 'GET',
        path: '/dataSources',
        handler: mongoController.dataSources
    });

    server.route({
        method: 'GET',
        path: '/dataSource/{id}',
        handler: mongoController.getById
    });


    return server;
};

module.exports = setupServer;

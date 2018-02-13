'use strict';

const Hapi = require('hapi');
const Pinger = require('./utils/pinger');

const setupServer = () => {

    const server = new Hapi.Server();

    server.connection({
        port: 3000,
        host: 'localhost'
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

    return server;
};

module.exports = setupServer;

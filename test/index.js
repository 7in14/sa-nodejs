'use strict';

const Lab = require('lab');
const SetupServer = require('../server');
const { expect } =  require('code');

const lab = exports.lab = Lab.script();

let server;

lab.before(() => {

    server = SetupServer();
});

lab.experiment('Index', () => {

    lab.test('ping should return "You say ping, I say Pong!"', async () => {

        // Arrange
        const pingRequest = {
            method: 'GET',
            url: '/ping'
        };

        // Act
        const response = await server.inject(pingRequest);

        // Assert
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.equal('You say ping, I say Pong!');
    });
});

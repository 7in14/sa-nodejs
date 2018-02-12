'use strict';

const Lab = require('lab');

const { expect } = require('code');
const Pinger = require('../utils/pinger');

const lab = exports.lab = Lab.script();

lab.experiment('Pinger test', () => {

    lab.test('should say pong', () => {

        const result = Pinger.sayPong();

        expect(result).to.equal('Pong');
    });
});

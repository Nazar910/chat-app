'use strict';
const io = require('socket.io-client');

const { expect } = require('chai');
const sinon = require('sinon');

const helpers = require('../helpers');

const messageTypes = ['message'];


describe('WebSockets', () => {

    for (const type of messageTypes) {

        let client1;
        let client2;

        before(async () => {
            await helpers.ensureApp();

            const uri = 'ws://localhost:3000';
            client1 = io.connect(uri);
            client2 = io.connect(uri);
        });

        describe(type, () => {
            it('should be caught by another socket', async () => {
                const expectedMessage = 'Hello';

                client1.emit(type, expectedMessage);

                const actualMessage = await helpers.waitForMessage(type, client2, 100);

                expect(actualMessage).to.equal(expectedMessage);
            })
        })
    }

});

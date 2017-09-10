'use strict';
const io = require('socket.io-client');

const { expect } = require('chai');

const helpers = require('../helpers');

const messageTypes = ['message'];
const wsUri = 'ws://localhost:5000';

describe('WebSockets', () => {

    before(async () => {
        await helpers.ensureApp();
    });

    for (const type of messageTypes) {

        let client1;
        let client2;

        beforeEach(() => {
            client1 = io.connect(wsUri);
            client2 = io.connect(wsUri);
        });

        afterEach(() => {
            client1.disconnect();
            client2.disconnect();
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

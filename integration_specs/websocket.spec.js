'use strict';
const io = require('socket.io-client');

const { expect } = require('chai');
const sinon = require('sinon');

const helpers = require('../helpers');

describe('WebSockets', () => {

    let client1;
    let client2;

    before(async () => {
        await helpers.ensureApp();

        const uri = 'ws://localhost:3000';
        client1 = io.connect(uri);
        client2 = io.connect(uri);
    });

    describe('when one socket emits message', () => {
        const type = 'message';

        let messageHanlderSpy;
        
        beforeEach(() => {
            messageHanlderSpy = sinon.spy();
        });

        it('should be caught by another socket', async () => {
            const expectedMessage = 'Hello';

            client1.emit(type, expectedMessage);

            const actualMessage = await helpers.waitForMessage(type, client2, 100);

            expect(actualMessage).to.equal(expectedMessage);
        })

    })

});

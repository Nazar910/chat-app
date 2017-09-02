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
            client2.on(type, messageHanlderSpy);
        });

        it('should be caught by another socket', async () => {
            const message = 'Hello';

            client1.emit(type, message);

            await new Promise(resolve => setTimeout(resolve, 100));

            const { callCount } = messageHanlderSpy;

            expect(callCount).to.equal(1);

            const { args } = messageHanlderSpy.getCall(0);

            expect(args).to.deep.equal([message]);
        })

    })

});

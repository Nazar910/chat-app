'use strict';

const { expect } = require('chai');
const helpers = require('../helpers');

describe('WebSockets', () => {

    before(async () => {
        await helpers.ensureApp();
    });

    describe('when one socket emits hello', () => {

        it('should be caught by another socket', () => {

        })

    })

});

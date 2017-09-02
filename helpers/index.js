'use strict';

async function ensureApp() {
    await require('../web');
}

module.exports = {
    ensureApp
};

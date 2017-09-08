'use strict';

async function ensureApp() {
    await require('../web');
}

function waitForMessage(messageType, wsClient, timeOut) {
    const timeToEnd = Date.now() + timeOut;

    return new Promise((resolve, reject) => {
        wsClient.on(messageType, resolve);

        if (Date.now >= timeToEnd) {
            return reject(`Timeout exceeded for messageType=${messageType}`)
        }
    })
}


module.exports = {
    ensureApp,
    waitForMessage
};

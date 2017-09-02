'use strict';

const envs = process.env;

module.exports = {
    FRONTEND_PORT: envs.FRONTEND_PORT || 3000
};

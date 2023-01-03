"use strict";
module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'db',
        host: process.env.HOST || 'localhost',
        dialect: process.env.DIALECT || 'postgres',
    }
};

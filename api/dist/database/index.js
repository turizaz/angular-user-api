"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host: 'postgres',
        user: 'postgres',
        password: 'password',
        database: 'postgres'
    },
    migrations: {
        directory: __dirname + '/../db/migrations',
        tableName: 'knex-migrations',
    },
});
exports.default = db;
//# sourceMappingURL=index.js.map
const config = require('./knexfile')

const db = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host : config.development.connection.host,
        user : config.development.connection.user,
        password : config.development.connection.password,
        database : config.development.connection.database
    },
    migrations:  config.development.migrations
});
export default db

const config = require("./knexfile")

const db = require("knex")({
    client: "pg",
    connection: {
        database : config.development.connection.database,
        host : config.development.connection.host,
        password : config.development.connection.password,
        user : config.development.connection.user,
    },
    migrations:  config.development.migrations,
    version: "7.2",
});

export default db;

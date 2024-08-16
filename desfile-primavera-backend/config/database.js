const pgPromise = require('pg-promise');
const pgp = pgPromise({});
const db = pgp({
    user: 'postgres',
    host: 'localhost',
    database: 'primavera',
    password: 'jhyssel19',
    port: 5432,
});

module.exports = db;

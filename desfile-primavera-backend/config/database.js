const { Client } = require('pg');

const db = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'jhyssel19',
    database: 'primavera'
});

module.exports = db;

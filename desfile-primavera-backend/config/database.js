const { Client } = require('pg');
const client = new Client({
    host:'localhost',
    user:'postgres',
    password:'jhyssel19',
    database:'primavera'
});
client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});
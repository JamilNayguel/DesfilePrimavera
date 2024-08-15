const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const app = express()

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`Server in http://localhost:${PORT}`);
});

const jwt = require('jsonwebtoken');

const payload = {
  userId: 12345,
  role: 'admin'
};

const secret = 'your_secret_key';
const token = jwt.sign(payload, secret, { expiresIn: '1h' });

console.log(token);

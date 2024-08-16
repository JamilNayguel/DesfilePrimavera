const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.js');
const requestRouter = require('./routes/request.js');
const app = express(); 
const PORT = process.env.PORT || 1234;

app.use(express.json()); 
app.disable('x-powered-by'); 
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/user', userRouter);
app.use('/request', requestRouter);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.js');

const app = express(); 
const PORT = process.env.PORT || 1234;

app.use(express.json()); 
app.disable('x-powered-by'); 
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

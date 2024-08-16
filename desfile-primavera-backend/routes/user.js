const { Router } = require('express');
const { login, verificarToken } = require('../controllers/userController.js');

const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/logout', verifyToken, logout);
module.exports = userRouter;

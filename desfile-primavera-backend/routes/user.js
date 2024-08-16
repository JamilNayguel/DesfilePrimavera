const { Router } = require('express');
const { login, logout, verifyToken } = require('../controllers/userController.js');  // Verifica que estás importando logout y verifyToken

const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/logout', verifyToken, logout);

module.exports = userRouter;

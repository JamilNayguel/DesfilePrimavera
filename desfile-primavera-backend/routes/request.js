const { Router } = require('express');
const { createRequest, getRequestById, searchRequestsByNameAndLastName, searchRequestsByMultipleParams } = require('../controllers/requestController.js');
const { verifyToken } = require('../controllers/userController.js');

const requestRouter = Router();

requestRouter.post('/create', createRequest);

requestRouter.get('/search', verifyToken, searchRequestsByNameAndLastName);

requestRouter.get('/:id', verifyToken, getRequestById);

requestRouter.get('/filter', verifyToken, searchRequestsByMultipleParams);

module.exports = requestRouter;

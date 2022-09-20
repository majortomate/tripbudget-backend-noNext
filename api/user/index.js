const express = require('express');
const { Router } = express;

 
 const getAllUsersHandler = require('./user.controller')
 
 const router = Router();
 
 router.get('/', getAllUsersHandler);

 module.exports = router;

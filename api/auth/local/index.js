const { Router} = require('express')
const {registerUserHandler,
  resetUserPasswordHandler,
  loginUserHandler,
  verifyUserHandler,} = require('./auth.controller')

const router = Router();
 
 router.post('/register', registerUserHandler)
 router.patch('/forgot', resetUserPasswordHandler)
 router.post('/login', loginUserHandler)
 router.get('/verify-account/:token', verifyUserHandler)
 
module.exports= router;


const express = require('express');
const { Router } = express;

 
 const {
  getAllTripsHandler,
  createSingleTripHandler,
  getSingleTripHandler,
  updateSingleTripHandler,
  deleteSingleTripHandler,
} = require('./trip.controller')
 const {isAuthenticated} = require('../auth/local/auth.service')
 const router = Router();
 
 router.get('/', getAllTripsHandler)
 router.post('/', isAuthenticated, createSingleTripHandler)
 router.get('/:id', getSingleTripHandler)
 router.patch('/:id', updateSingleTripHandler)
 router.delete('/:id', deleteSingleTripHandler)

 module.exports = router;

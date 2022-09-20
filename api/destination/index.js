const express = require('express');
const { Router } = express;

 
 const {
  getAllDestinationHandler,
  getSingleDestinationHandler,
  createSingleDestinationHandler,
  updateSingeDestinationHandler,
  deleteSingleDestinationHandler
} = require('./destination.controller')
 
 const router = Router();
 
 router.get('/', getAllDestinationHandler)
 router.post('/', createSingleDestinationHandler)
 router.get('/:id', getSingleDestinationHandler)
 router.patch('/:id', updateSingeDestinationHandler)
 router.delete('/:id', deleteSingleDestinationHandler)

 module.exports = router;

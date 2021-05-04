const express = require('express')
const router = express.Router()
const CarController = require('../controllers/Car.controller');

// Retrieve all Cars
router.get('/', CarController.findAll);

// Create a new Car
router.post('/', CarController.create);

// Retrieve a single Car with id
router.get('/:id', CarController.findById);

// Update a Car with id
router.put('/:id', CarController.update);

// Delete a Car with id
router.delete('/:id', CarController.delete);

module.exports = router
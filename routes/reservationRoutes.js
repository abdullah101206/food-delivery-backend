const express = require('express');
const router = express.Router();
const { createReservation } = require('../controllers/reservationController');

// Sirf public table reservation route
router.post('/', createReservation);

module.exports = router;
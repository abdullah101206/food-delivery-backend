const express = require('express');
const router = express.Router();
const { createReservation, getAllReservations } = require('../controllers/reservationController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Public route: User reservation form submit karega
router.post('/', createReservation);

// Protected route: Sirf Admin sabhi reservations dekh sakega
router.get('/', verifyAdmin, getAllReservations);

module.exports = router;
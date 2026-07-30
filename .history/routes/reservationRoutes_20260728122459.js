const express = require('express');
const router = express.Router();
const { createReservation, getAllReservations } = require('../controllers/reservationController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Route 1: Post Reservation (Public)
router.post('/', createReservation);

// Route 2: Get Reservations (Admin)
router.get('/', verifyAdmin, getAllReservations);

module.exports = router;
const Reservation = require('../models/Reservation');

// POST /api/reservations
exports.createReservation = async (req, res) => {
  try {
    const { name, phone, guests, date, time, occasion, specialRequest } = req.body;

    if (!name || !phone || !guests || !date || !time) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const reservation = new Reservation({
      name,
      phone,
      guests,
      date,
      time,
      occasion,
      specialRequest,
    });

    await reservation.save();

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully!',
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
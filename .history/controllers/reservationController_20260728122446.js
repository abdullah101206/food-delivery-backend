const Reservation = require('../models/Reservation');

// Create Reservation (Public)
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

// Get All Reservations (Admin Only)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reservations', error: error.message });
  }
};
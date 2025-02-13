const Booking = require('../models/Booking');
const Service = require('../models/Service');
const asyncHandler = require('express-async-handler');

//create new booking
//POST /api/v1/booking
// public
const createBooking = asyncHandler(async (req, res) => {
    const {service: serviceId, date, time, user} = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
        res.status(400);
        throw new Error("Invalid service");
    }

    const existingBooking = await Booking.findOne({
        date,
        time,
        status: {$ne : 'cancelled'}
    })

    if (existingBooking) {
        res.status(400);
        throw new Error('Time slot already booked');
      }
    
      const booking = await Booking.create({
        user,
        service: serviceId,
        date,
        time
      });
    
      res.status(201).json({
        bookingId: booking._id, 
        user: booking.user,
        service: booking.service,
        date: booking.date,
        time: booking.time,
        status: booking.status,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
    });
})

//  Get all bookings
//  GET /api/v1/bookings
//  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  try {
    
    const bookings = await Booking.find({})
      .populate('service', 'name price duration');
    
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// update the status
// put /api/v1/booking/:id
// private/Admin
const updateStatus = asyncHandler (async (req, res) => {
  const {id} = req.params;
  const {status} = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return req.status(404).send('Booking not found');

    booking.status = status;
    await booking.save();

    res.send(booking);
  } catch (error) {
    res.status(500).send("Error updating status")
  }
})

module.exports = {
  createBooking,
  getBookings,
  updateStatus
};
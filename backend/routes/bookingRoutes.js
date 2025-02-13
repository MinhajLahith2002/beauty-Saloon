const express = require('express');
const router = express.Router();
const { 
    createBooking,
     getBookings, 
     updateStatus
    } = require('../controllers/bookingController');

router.route('/booking').post(createBooking);
router.route('/bookings').get(getBookings);
router.route('/booking/:id').put(updateStatus);

module.exports = router;
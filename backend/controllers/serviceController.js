const Service = require('../models/Service');
const asyncHandler = require('express-async-handler');

// create new service
// POST: /api/v1/service
//private/admin
const createService = asyncHandler(async(req, res) => {
    const {name, description, price, duration} = req.body;

    const serviceExists = await Service.findOne({name});
    if (serviceExists) {
        res.status(400);
        throw new Error('Service already exists');
    }

    const service = await Service.create({
        name,
        description,
        price,
        duration
    });

    res.status(201).json({
        success: true,
        service
    })
})

//update service
//PUT: /api/v1/service/:id
//private/admin
const updateService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Service not found');
    }

    const updateService = await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true, runValidators: true}
    );

    res.json({
        success: true,
        updateService
    })
})

//delete service
//DELETE: /api/v1/service/:id
//private/admin
const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        req.status(404);
        throw new Error('Service not found');
    }

    await Service.deleteOne({ _id: req.params.id });
    res.json({message: 'Service removed'});
});

//get all services
//GET: /api/v1/services
// public
// Example controller function
const getServices = asyncHandler(async (req, res) => {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = {
    createService,
    updateService,
    deleteService,
    getServices
}
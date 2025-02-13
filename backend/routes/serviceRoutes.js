const express = require('express');
const router = express.Router();
const { 
    getServices, 
    createService, 
    updateService, 
    deleteService
 } = require('../controllers/serviceController');


router.route('/services').get(getServices)
router.route('/service').post(createService);

router.route('/service/:id')
.put(updateService)
.delete(deleteService);

module.exports = router;


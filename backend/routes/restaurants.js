const express = require('express');
const { getRestaurants , getRestaurant, createRestaurant , updateRestaurant , deleteRestaurant } = require('../controllers/restaurants');
const router = express.Router();

const reservationRouter = require('./reservations');

const {protect, authorize} = require('../middleware/auth');

router.use('/:restaurantId/reservations', reservationRouter);

router.get('/', getRestaurants)
      .get('/:id', getRestaurant)
      .post('/', protect, authorize('admin'), createRestaurant)
      .put('/:id', protect, authorize('admin'), updateRestaurant)
      .delete('/:id', protect, authorize('admin'), deleteRestaurant);

module.exports = router;
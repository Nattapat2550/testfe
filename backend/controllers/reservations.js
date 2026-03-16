const Reservation = require("../models/Reservation");
const Restaurant = require("../models/Restaurant");

// @desc    Get all reservations
// @route   GET /api/v1/reservations
// @access  Protect
exports.getReservations = async (req, res, next) => {
    let query;

    try {

        // Normal users can see only their reservations
        if (req.user.role !== 'admin') {
            query = Reservation.find({ user: req.user.id }).populate({
                path:'restaurant',
                select: 'name tel email'
            });
        } 
        // Admin can see all
        else {
            if (req.params.restaurantId) {
                console.log(req.params.restaurantId);
                query = Reservation.find({ restaurant: req.params.restaurantId }).populate({
                    path:'restaurant',
                    select: 'name tel email'
                });
            } else {
                query = Reservation.find().populate({
                    path:'restaurant',
                    select: 'name tel email'
                });
            }
        }

        const reservations = await query;

        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Cannot find Reservation'
        });
    }
};

//@desc      Get single reservation
//@route     GET /api/v1/reservations/:id
//@access    Protect

exports.getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate({
            path: 'restaurant',
            select: 'name tel email'
        });

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: `No reservation with the id of ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: reservation
        });

    } catch (error) {

        console.log(error);
        console.log(Reservation);

        return res.status(500).json({
            success: false,
            message: 'Cannot find Reservation'
        });

    }
};

//@desc      Add reservation
//@route     POST /api/v1/restaurants/:restaurantId/reservations
//@access    Private

exports.addReservation = async (req, res, next) => {
    try {
        req.body.restaurant = req.params.restaurantId;

        const restaurant = await Restaurant.findById(req.params.restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: `No restaurant with the id of ${req.params.restaurantId}`
            });
        }

        // Ensure time is provided
        if (!req.body.time) {
            return res.status(400).json({
                success: false,
                message: "Please provide reservation time"
            });
        }

        // Convert HH:MM to minutes
        const convertToMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const reserveMinutes = convertToMinutes(req.body.time);
        const openMinutes = convertToMinutes(restaurant.opentime);
        const closeMinutes = convertToMinutes(restaurant.closetime);
        
        // Check opening hours
        if (openMinutes <= closeMinutes) {
            // Normal Day
            if (reserveMinutes < openMinutes || reserveMinutes >= closeMinutes) {
                return res.status(400).json({
                    success: false,
                    message: `Reservation time must be between ${restaurant.opentime} and ${restaurant.closetime}`
                });
            }
        } else {
            // Over night
            if (reserveMinutes < openMinutes && reserveMinutes >= closeMinutes) {
                return res.status(400).json({
                    success: false,
                    message: `Reservation time must be between ${restaurant.opentime} and ${restaurant.closetime}`
                });
            }
        }

        //add user Id to req.body
        req.body.user = req.user.id;

        //Check for existed reservation
        const existedReservations = await Reservation.find({ user: req.user.id });

        //If the user is not an admin, they can only create 3 reservation.
        if (existedReservations.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({
                success: false,
                message: `The user with ID ${req.user.id} has already made 3 reservations`
            });
        }

        const reservation = await Reservation.create(req.body);

        res.status(201).json({
            success: true,
            data: reservation
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Cannot create Reservation'
        });

    }
};

//@desc      Update reservation
//@route     PUT /api/v1/reservations/:id
//@access    Private

exports.updateReservation = async (req, res, next) => {

    try {

        let reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: `No reservation with the id of ${req.params.id}`
            });
        }

        //Make sure user is the reservation owner
        if (reservation.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this reservation`
            });
        }

        const restaurant = await Restaurant.findById(reservation.restaurant);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: `Restaurant not found`
            });
        }

        // Ensure time is provided
        if (!req.body.time) {
            return res.status(400).json({
                success: false,
                message: "Please provide reservation time"
            });
        }

        // Convert HH:MM to minutes
        const convertToMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const reserveMinutes = convertToMinutes(req.body.time);
        const openMinutes = convertToMinutes(restaurant.opentime);
        const closeMinutes = convertToMinutes(restaurant.closetime);

        // Check opening hours
        if (openMinutes <= closeMinutes) {
            // Normal Day
            if (reserveMinutes < openMinutes || reserveMinutes >= closeMinutes) {
                return res.status(400).json({
                    success: false,
                    message: `Reservation time must be between ${restaurant.opentime} and ${restaurant.closetime}`
                });
            }
        } else {
            // Over Night
            if (reserveMinutes < openMinutes && reserveMinutes >= closeMinutes) {
                return res.status(400).json({
                    success: false,
                    message: `Reservation time must be between ${restaurant.opentime} and ${restaurant.closetime}`
                });
            }
        }

        reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: reservation
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Cannot update Reservation'
        });

    }

};

//@desc      Delete reservation
//@route     DELETE /api/v1/reservations/:id
//@access    Private

exports.deleteReservation = async (req, res, next) => {

    try {

        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: `No reservation with the id of ${req.params.id}`
            });
        }

        //Make sure user is the reservation owner
        if (reservation.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this reservation`
            });
        }

        await reservation.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Cannot delete Reservation'
        });

    }

};
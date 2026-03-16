const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please add a name'], unique: true, trim: true },
    address: { type: String, required: [true, 'Please add an address'] },
    tel: { type: String, required: [true, 'Please add a telephone number'] },
    opentime: { type: String, required: [true, 'Please add open time'] }, 
    closetime: { type: String, required: [true, 'Please add close time'] } 
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

RestaurantSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    console.log(`Reservations being removed from restaurant ${this._id}`);
    await this.model('Reservation').deleteMany({ restaurant: this._id });
});

// Reverse populate with virtuals
RestaurantSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'restaurant',
    justOne: false
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
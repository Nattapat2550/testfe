const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Please add valid time HH:MM']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: "Restaurant",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ReservationSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.date) {
      ret.date = ret.date.toISOString().split('T')[0];
    }
    return ret;
  }
});

module.exports = mongoose.model("Reservation", ReservationSchema);
const mongoose = require('mongoose')

const campgroundSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    location: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    image: {
        type: String,
    }
})

const Campground = mongoose.model('Campground', campgroundSchema)
module.exports = Campground;
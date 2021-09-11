const images = require('./images.js')
const cities = require('./cities.js')
const { descriptors, places } = require('./titles.js')
const description = require('./description.js')

const mongoose = require('mongoose')
main().then(data => console.log('Database connected!')).catch(err => console.log(err))
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp-self')
}
const Campground = require('../models/campground.js')

const seedDB = async () => {
    await Campground.deleteMany({})

    for (let i = 0; i < 50; i++) {
        const randDescriptor = Math.floor(Math.random() * descriptors.length)
        const randPlaces = Math.floor(Math.random() * places.length)
        const randImages = Math.floor(Math.random() * images.length)
        const randPrice = Math.floor(Math.random() * 30) + 10
        const randCity = Math.floor(Math.random() * cities.length)
        const randDescription = Math.floor(Math.random() * description.length)

        const camp = await new Campground({
            title: `${descriptors[randDescriptor]} ${places[randPlaces]}`,
            image: `${images[randImages]}`,
            price: randPrice,
            location: `${cities[randCity].city}, ${cities[randCity].state}`,
            description: `${description[randDescription]}`,
        })
        await camp.save()
    }

}
seedDB().then(() => {
    mongoose.connection.close()
})






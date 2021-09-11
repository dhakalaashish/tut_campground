const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const wrapAsync = require('./utility/wrapAsync.js')
const ExpressError = require('./utility/ExpressError.js')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
main().then(data => console.log('Database connected!')).catch(err => console.log(err))
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp-self')
}
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.engine('ejs', ejsMate)

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
//home page
app.get('/', (req, res) => {
    res.render('campgrounds/home.ejs')
})
//index page
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index.ejs', { campgrounds })
})
//new page
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new.ejs')
})
//posting a new campground
app.post('/campgrounds', async (req, res) => {
    const { title, location, price, image, description } = req.body.campground
    const newCampground = await new Campground({ title: title, location: location, price: price, image: image, description: description })
    await newCampground.save()
    res.redirect(`/campgrounds/${newCampground._id}`)
})
//show page
app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    res.render('campgrounds/show.ejs', { campground })
})
//deleting
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    const deletedCampground = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})
//edit form page
app.get('/campgrounds/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    res.render('campgrounds/edit.ejs', { campground })
}))
//editing 
app.put('/campgrounds/:id', wrapAsync(async (req, res) => {
    const { id } = req.params
    const updatedCampground = await Campground.findByIdAndUpdate(id, req.body.campground)
    res.redirect(`/campgrounds/${id}`)
}))
app.all('*', (res, req) => {
    throw new ExpressError('Page Not Found', 404)
})


app.listen(5000, () => {
    console.log('Server Listening on Port 5000')
})

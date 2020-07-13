const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require("mongoose"),
	PORT = 1000,
	Campground = require("./models/campgrounds")

mongoose.connect("mongodb://localhost/yelp_camp", { useUnifiedTopology: true, useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('landing');
});
// INDEX - show all campgrounds
app.get('/campgrounds', (req, res) => {
	// Get all campgrounds from db
	Campground.find({}, (err, allCampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render("index", { campgrounds: allCampgrounds });
		}
	})
});
// CREATE - add new campground to DB
app.post('/campgrounds', (req, res) => {
	// get data from and make an object
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description
	var newCampground = { name: name, image: image, description: desc };
	// Create a new campground and save to DB
	Campground.create(newCampground, (err, newlyCreated) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	})
});
// NEW - show form to create campground
app.get('/campgrounds/new', (req, res) => {
	res.render('new');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
	// find the campground with provided ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err) {
			console.log(err)
		} else {
			// render show template with that campground
			res.render("show", { campground: foundCampground });
		}
	})
})

app.listen(PORT, function () {
	console.log("The YelpCamp Server Has Started!!")
})
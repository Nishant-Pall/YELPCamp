const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require("mongoose"),
	PORT = 1000

mongoose.connect("mongodb://localhost/yelp_camp", {useUnifiedTopology:true, useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
// 		{
// 			name:"Granite Hill",
// 			image:"https://images.pexels.com/photos/1840421/pexels-photo-1840421.jpeg?auto=compress&cs=tinysrgb&h=350",
// 			description:"This is a huge granite hill, no bathroom, no water, Beautiful Granite!"
// 		}, (err, campground) => {
// 				if(err){
// 					console.log(err);
// 				} else{
// 					console.log("Newly created campground");
// 					console.log(campground);
// 				}
// 			}
// );

app.get('/',(req, res)=>{
	res.render('landing');
});
// INDEX - show all campgrounds
app.get('/campgrounds', (req, res)=>{
	// Get all campgrounds from db
	Campground.find({}, (err, allCampgrounds)=>{
		if(err){
			console.log(err);
		} else{
			res.render("index",{campgrounds:allCampgrounds});
		}
	})
});
// CREATE - add new campground to DB
app.post('/campgrounds',(req, res)=>{
	// get data from and make an object
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image};
	// Create a new campground and save to DB
	Campground.create(newCampground,(err, newlyCreated)=>{
		if(err){
			console.log(err);
		} else{
			res.redirect('/campgrounds');		
		  }
	})	
});
// NEW - show form to create campground
app.get('/campgrounds/new',(req, res)=>{
	res.render('new');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id',(req, res)=>{
	// find the campground with provided ID
	// render show template with that campground
	res.render("show");
})

app.listen(PORT, function(){
	console.log("The YelpCamp Server Has Started!!")
})
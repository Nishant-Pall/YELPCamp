const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp", {useUnifiedTopology:true, useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

const Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
// 		{
// 			name:"Granite Hill",
// 			image:"https://images.pexels.com/photos/1840421/pexels-photo-1840421.jpeg?auto=compress&cs=tinysrgb&h=350"
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

app.get('/campgrounds', (req, res)=>{
	// Get all campgrounds from db
	Campground.find({}, (err, allcampgrounds)=>{
		if(err){
			console.log(err)
		} else{
			res.render("campgrounds",{campgrounds:allcampgrounds});
		}
	})
});

app.post('/campgrounds',(req, res)=>{
	// get data from and add to campgrounds array
	var name = req.body.name
	var image = req.body.image
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

app.get('/campgrounds/new',(req, res)=>{
	res.render('new');
});

app.listen(6969, function(){
	console.log("The YelpCamp Server Has Started!!")
})
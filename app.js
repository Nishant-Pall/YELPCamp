var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

var campgrounds = [
		{name:"Salmon Creek",image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Granite Hill",image:"https://images.pexels.com/photos/1840421/pexels-photo-1840421.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Mountain Goat's Rest",image:"https://images.pexels.com/photos/2108709/pexels-photo-2108709.jpeg?auto=compress&cs=tinysrgb&h=350"}
	]

app.get('/',(req, res)=>{
	res.render('landing');
});

app.get('/campgrounds', (req, res)=>{

	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post('/campgrounds',(req, res)=>{
	// get data from and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image};
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new',(req, res)=>{
	res.render('new');
});

app.listen(6969, function(){
	console.log("The YelpCamp Server Has Started!!")
})
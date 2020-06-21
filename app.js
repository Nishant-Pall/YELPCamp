var express = require('express');
var app = express();

app.set('view engine','ejs');

app.get('/',(req, res)=>{
	res.render('landing');
});

app.get('/campgrounds', (req, res)=>{
	var campgrounds = [
		{name:"Salmon Creek",image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Granite Hill",image:"https://images.pexels.com/photos/1840421/pexels-photo-1840421.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Mountain Goat's Rest",image:"https://images.pexels.com/photos/2108709/pexels-photo-2108709.jpeg?auto=compress&cs=tinysrgb&h=350"}
	]

	res.render("campgrounds",{campgrounds:campgrounds});
});


app.listen(6969, function(){
	console.log("The YelpCamp Server Has Started!!")
})
const mongoose = require("mongoose")
const Campground = require("./models/campgrounds")
var Comment = require("./models/comment")
var data = [
    {
        name: "Cloud's Rest",
        image: "https://i.insider.com/5ed13edd988ee326725f1526?width=1100&format=jpeg&auto=webp",
        description: "Blah Blah Blah"
    },

    {
        name: "Desert Mesa",
        image: "https://i.insider.https://pix10.agoda.net/hotelImages/222/2225850/2225850_17051516230052996076.jpg?s=1024x768/5ed13edd988ee326725f1526?width=1100&format=jpeg&auto=webp",
        description: "Blah Blah Blah"
    },
    {
        name: "Canyon Floor",
        image: "https://i.insider.https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80com/5ed13edd988ee326725f1526?width=1100&format=jpeg&auto=webp",
        description: "Blah Blah Blah"
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("removed campgrounds")
        }

        // add a few campgrounds
        data.forEach((seed) => {

            Campground.create((err, campground) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Added a campground")

                    // create a few comments
                    Comment.create(
                        {
                            text: "This is great",
                            author: "Homer"
                        }, (err, comment) => {
                            if (err) {
                                console.log(err)
                            } else {
                                campground.comments.push(comment)
                                campground.save()
                                console.log("added a new comment")
                            }
                        }
                    )
                }
            })
        })
    })
}
module.exports = seedDB
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

var express       = require("express")
    app           = express()
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose")

// connect mongoose
mongoose.connect("mongodb://localhost:27017/photo_contest", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");


// Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//Add photo in a database
// Campground.create(
//     {
//         name:"Salmon Creek",
//         image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Ophrys_apifera_flower1.jpg"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Newly created campground");
//             console.log(campground);
//         }
//     }
// );



// var campgrounds = [
//     {name: "Salmon Creek", image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Ophrys_apifera_flower1.jpg"},
//     {name: "Holy camp", image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Raggiana_Bird-of-Paradise_wild_5.jpg"},
//     {name: "Granite hills", image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Golden-backed_Weaver.jpg "},
//     {name: "Salmon Creek", image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Ambrosius_Bosschaert_the_Elder_%28Dutch_-_Flower_Still_Life_-_Google_Art_Project.jpg"},
//     {name: "Sonia", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Bees_Collecting_Pollen_cropped.jpg"},
//     {name: "Cool camp", image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/White_and_yellow_flower.JPG"},
   

// ];

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    // get all images from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds",{campgrounds:allCampgrounds});
            
        }
    });
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image}
   Campground.create(newCampground,function(err,newlyCreated){
       if(err){
           console.log(err);
       }else{
           res.redirect("/campgrounds");
       }
    });
   });
  

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
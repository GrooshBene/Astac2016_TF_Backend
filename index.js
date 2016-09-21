var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended : true
}));

var server = require('http').Server(app);
var https = require('https');
var randomString = require('randomstring');

var schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/tf", function (err) {
    if(err){
        console.log("Mongo DB Error!");
        throw err;
    }
});

var userSchema = new schema({
    _id : String,
    id : String,
    password : String,
    user_type : String,
    age : Number,
    gender : String,
    auth_token : String
});

var placeSchema = new schema({
    _id : String,
    place_name : String,
    place_seller : String,
    open_time : String,
    close_time : String,
    place_silence : Number,
    place_bright : Number,
    place_temp : Number,
    place_address : String,
    place_category : String,
    seller_talk : String,
    rate_average : String
});

var reviewSchema = new schema({
    _id : String,
    place_id : String,
    writer_id : String,
    writer_name : String,
    review_content : String,
    place_rate : String,
    place_theme : String
});

var User = mongoose.model('user', userSchema);

var Place = mongoose.model('place', placeSchema);

var Review = mongoose.model('review', reviewSchema);

server.listen(8080);

console.log('Server Running At Port 8080');

require('./route/oauth')(app, User, randomString);

require('./route/place')(app, User, Place, randomString);

require('./route/review')(app, Review, User, Place,randomString);
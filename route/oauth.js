/**
 * Created by bene on 2016. 8. 6..
 */
module.exports = init;

function init(app, User, randomString){

    var mongoose = require('mongoose');
    var passport = require('passport');

    app.use(passport.initialize());
    app.use(passport.session());

    var FacebookTokenStrategy = require('passport-facebook-token');

    passport.serializeUser(function(user,done){
        done(null, user);
    });

    passport.deserializeUser(function(obj, done){
        done(null, obj);
    });

    passport.use(new FacebookTokenStrategy({
        clientID : "935288616617932",
        clientSecret : "1d42f78685c8d2ff032e8e661992adc2",
        profileFields : ['id', 'displayName', 'photos', 'age','gender', 'permissions'],
    }, function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({
            '_id' : profile.id
        }, function (err, user) {
            if(err){
                return done(err);
            }
            if(!user){
                user = new User({
                    _id: profile.id,
                    name : profile.displayName,
                    profile: profile.photos,
                    gender : profile.gender,
                    friends : [],
                    phone : profile.phone,
                    average : 0
                });
                user.save(function (err) {
                    if(err) console.log(err);
                    else{
                        done(null, profile);
                    }
                })
            }
            else if(user){
                done(null, profile);
            }
        })
    }));

    app.get('/auth/facebook/token', passport.authenticate('facebook-token', {session: false, scope : ['user_friends', 'manage_pages']}),
        function (req, res) {
            console.log("user token : " + req.param('access_token'));
            if(req.user){
                res.send(200, req.user);
            }
            else if(!req.user){
                res.send(401, req.user);
            }
        });

    app.get('/auth/facebook/callback', passport.authenticate('facebook-token', {
        successRedirect : '/',
        failureRedirect : '/'
    }));


    app.post('/auth/register', function (req, res) {
        user = new User({
            _id : randomString.generate(13),
            id : req.param('user_id'),
            password : req.param('password'),
            api_token : randomString.generate(15)
        });
        user.save(function (err) {
            if(err){
                console.log("/auth/register Failed");
                throw err;
            }
            else{
                console.log("user register : " + user);
                res.send(200, user);
            }
        });


    });

    app.post('/auth/authenticate', function (req, res) {
        console.log('Auth Key : ' + req.param('token'));
        User.findOne({api_token : req.param('token')}, function(err, result){
            if(err){
                console.log("/auth/authenticate failed");
                throw err;
            }
            console.log("User "+result+"Logged In");
            res.send(200, result);
        })
    });

    app.post('/auth/destroy', function (req, res) {
        User.findOne({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log("/auth/destroy Failed");
                throw err;
            }
            console.log("Destroy User : " +req.param('id'));
            res.send(200, result);
        }).remove();
    });
    
    app.post('/me/info', function (req, res) {
        User.findOne({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log("/me/info err");
                throw err;
            }
            console.log('Founded : '+ result);
            res.send(200, result);
        })
    });

    app.post('/me/review', function (req, res) {
        Review.find({writer_id : req.param('id')}, function (err, result) {
            if(err){
                console.log("/me/review err");
                throw err;
            }
            console.log("Founded : "+ result);
            res.send(200, result);
        })
    })

    //function end
}

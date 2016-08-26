/**
 * Created by bene on 2016. 8. 6..
 */
module.exports = init;

function init(app, Review, User, Place, randomString) {
    app.post('/review/write', function (req, res) {
        var average_temp = 0;
        review = new Review({
            _id : randomString.generate(15),
            place_id : req.param('place_id'),
            writer_id : req.param('writer_id'),
            writer_name : req.param('writer_name'),
            review_content : req.param('review_content'),
            place_rate : req.param('place_rate')
        });
        
        review.save(function (err) {
            if(err){
                console.log('/review/write err');
                throw err;
            }
            res.send(200, review);
        });

        Review.find({place_id : req.param('place_id')}, function (err, result_review) {
            if(err){
                console.log('/review/write Review Find db Error');
                throw err;
            }
            Place.findOne({_id : req.param('place_id')}, function (err, result) {
                if(err){
                    console.log("/review/write average update error");
                    throw err;
                }
                average_temp = result.rate_average;
                average_temp + req.param('place_rate');
                average_temp / result_review.length();
                Place.update({_id : req.param('place_id')}, {rate_average : average_temp}, function (err, result) {
                    if(err){
                        console.log('/review/write Average Update db Error');
                        throw err;
                    }
                    console.log("Place "+ req.param('place_id') + " Updated : " + result);
                })
            })
        })
    });
    
    app.get('/review/:place_id', function(req,res){
        Review.findOne({place_id : req.param('place_id')}, function (err, result) {
            if(err){
                console.log('/review/:place_id err');
                throw err;
            }
            console.log("Founded : "+ result);
            res.send(200, result);
        });
    });


    //function end
}
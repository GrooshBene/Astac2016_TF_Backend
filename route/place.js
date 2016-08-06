/**
 * Created by bene on 2016. 8. 6..
 */
module.exports = init;

function init(app, Review, User, randomString) {
    app.post('/review/write', function (req, res) {
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
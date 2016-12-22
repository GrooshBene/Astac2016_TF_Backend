/**
 * Created by bene on 2016. 8. 6..
 */

module.exports = init;

function init(app, User, Place, Temp, randomString){

    app.post('/place/add', function (req, res) {
        place = new Place({
            _id : randomString.generate(15),
            place_seller : req.param('seller_id'),
            place_name : req.param('place_name'),
            open_time : req.param('time_open'),
            close_time : req.param('time_close'),
            place_silence : 0,
            place_bright : 0,
            place_address : req.param('place_address'),
            seller_talk : req.param('seller_talk'),
            rate_average : '0',
            place_category : req.param('place_category')
        });
        place.save(function (err) {
            if(err){
                console.log("/place/add failed");
                throw err;
            }
            else{
                console.log("place added : "+ place);
                res.send(200, place)
            }
        })
    });

    app.post('/place/list', function (req, res) {
        Place.find({}, function (err, result) {
            if(err){
                console.log('/place/list err');

                throw err;
            }
            console.log("Place List : " + result);
            res.send(200, result);
        });
    });

    app.post('/place/update', function (req, res) {
        Place.update({_id : req.param('place_id')}, {
            place_silence : req.param('place_silence'),
            place_bright : req.param('place_bright')},
            function (err, result) {
                if(err){
                    console.log('/place/update err');

                    throw err;
                }
                console.log("Place "+ req.param('place_id')+ "Updated + "+result);
                res.send(200, result);

        });
    });

    // app.get('/place/:place_id', function (req, res) {
    //     Place.find({_id : req.param('place_id')},function (err, result) {
    //         if(err){
    //             console.log('/place/{place_id} err');
    //             throw err;
    //         }
    //         console.log("Founded : "+ result);
    //         res.send(200, result);
    //     });
    // });

    app.get('/place/update/category', function (req, res) {
        Place.find({_id : req.param('place_id')}, {place_category : req.param('place_category')}, function (err, result) {
            if(err){
                console.log('/place/update/category err');
                throw err;
            }
            console.log("Place "+ result.place_name + "'s category updated.");
            res.send(200, result);
        })
    })

    app.get('/place/temp', function (req, res) {
        Temp.find({_id : 'coex'}, function (err, find_result) {
            console.log(find_result);
            if(find_result.length == 0) {
                temp = new Temp({
                    _id: 'coex',
                    info: req.param('info')
                });
                temp.save(function (err, silence) {
                    if (err) {
                        console.log("/place/info err");
                        throw err;
                    }
                    console.log("Saved");
                    res.send(200, silence);
                });
            }
            else if(find_result.length !=0){
                Temp.findOneAndUpdate({_id : 'coex'}, {info : req.param('info')})
                    .exec(function(err, result){
                        if(err){
                            console.log("/place/info Update Error");
                            throw err;
                        }
                        res.send(200, result);
                    })
            }
        });
    })

    app.post('/place/get/info', function (req, res) {
        Temp.findOne({_id : 'coex'}, function (err, result) {
            if(err){
                console.log('/place/get/info DB Error');
                throw err;
            }
            res.send(200, result);
        })
    })


    //function end
}
/**
 * Created by bene on 2016. 8. 6..
 */

module.exports = init;

function init(app, User, Place){

    app.post('/place/add', function (req, res) {
        place = new Place({
            _id : randomString.generate(15),
            place_seller : req.param('')
        })
    })


    //function end
}
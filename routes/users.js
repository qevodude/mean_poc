var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * GET userdetails.
 */
router.get('/userdetails/:id', function(req, res) {
    var db = req.db;
    var userToSee = req.params.id;
    var collection = db.get('userlist');
    collection.findOne(userToSee,function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        if (err)
        res.send(err);

        collection.find({},{},function(e,docs){
            res.json(docs);
        });
    });
});

/*
 * PUT to edituser.
 */
router.post('/edituser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToEdit = req.params.id;
    collection.updateById(userToEdit, req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.body.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;

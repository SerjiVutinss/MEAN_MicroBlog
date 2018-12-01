var mongoose = require('mongoose');
//var UserModel = require('../models/User');
var UserModel = mongoose.model('User');

exports.list = function (req, res) {

    let fields = ['_id', 'name', 'isAdmin'];
    UserModel.find(function (err, data) {
        res.json(data);
    }).select(fields);
}

// Display Post delete form on GET.
exports.delete_get = function (req, res) {
    // res.send('NOT IMPLEMENTED: Post delete GET');
    UserModel.deleteOne({ _id: req.params.id },
        function (err, data) {
            if (err)
                res.send(err);
            res.send(data);
        });
};
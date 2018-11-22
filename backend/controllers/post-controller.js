var PostModel = require('../models/Post');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Posts.
exports.list = function (req, res) {
    PostModel.find(function (err, data) {
        res.json(data);
    });
};

// Display detail page for a specific Post.
exports.detail = function (req, res) {
    PostModel.findById(req.params.id,
        function (err, data) {
            res.json(data);
        });
};

// Display Post create form on GET.
exports.create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Post create GET');
};

// Handle Post create on POST.
exports.create_post = function (req, res) {
    // res.send('NOT IMPLEMENTED: Post create POST');
    PostModel.create({
        user_id: req.body.user_id,
        title: req.body.title,
        content: req.body.content
    });
    console.log(req.body.title);
};

// Display Post delete form on GET.
exports.delete_get = function (req, res) {
    // res.send('NOT IMPLEMENTED: Post delete GET');
    PostModel.deleteOne({ _id: req.params.id },
        function (err, data) {
            if (err)
                res.send(err);
            res.send(data);
        })
};

// Handle Post delete on POST.
exports.delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Post delete POST');
};

// Display Post update form on GET.
exports.update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Post update GET');
};

// Handle Post update on POST.
exports.update_post = function (req, res) {
    // res.send('NOT IMPLEMENTED: Post update POST');
    console.log("Update POST" + req.params.id);
    console.log(req.body.title);
    console.log(req.body.content);

    PostModel.findByIdAndUpdate(req.params.id, req.body,
        function (err, data) {
            res.send(data);
        })
};
var CommentModel = require('../models/comment.model');

exports.user_comments_get = function (req, res) {
    CommentModel.find({ user_id: req.params.id }, function (err, data) {
        res.send(data);
    }).sort({ created_utc: -1 });
}

exports.post_comments_get = function (req, res) {
    console.log(req.params.post_id);
    CommentModel.find({ post_id: req.params.id }, function (err, data) {
        res.send(data);
    }).sort({ created_utc: -1 });
}

// Display list of all Comments.
exports.list = function (req, res) {
    // hardcode to sort descending by date created
    // TODO: look at additional route parameters
    CommentModel.find(function (err, data) {
        res.json(data);
    }).sort({ created_utc: -1 });
};

// Display detail page for a specific Comment.
exports.detail = function (req, res) {
    CommentModel.findById(req.params.id,
        function (err, data) {
            res.json(data);
        });
};

// Handle Comment create on POST.
exports.create_post = function (req, res) {
    CommentModel.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        username: req.body.username,
        content: req.body.content,
        created_utc: req.body.created_utc
    });
    console.log(req.body.title);
};

// Display Comment delete form on GET.
exports.delete_get = function (req, res) {
    CommentModel.deleteOne({ _id: req.params.id },
        function (err, data) {
            if (err)
                res.send(err);
            res.send(data);
        })
};

// Handle Comment update on POST.
exports.update_post = function (req, res) {
    CommentModel.findByIdAndUpdate(req.params.id, req.body,
        function (err, data) {
            res.send(data);
        })
};
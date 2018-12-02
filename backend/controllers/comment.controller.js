var CommentModel = require('../models/comment.model');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.user_comments_get = function (req, res) {
    // res.send("HELLO USER POSTS");
    // var p = [{ title: "none found" }];
    CommentModel.find({ user_id: req.params.id }, function (err, data) {
        res.send(data);
    }).sort({ created_utc: -1 });
}

exports.post_comments_get = function (req, res) {
    // res.send("HELLO USER POSTS");
    // var p = [{ title: "none found" }];
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

// Display Comment create form on GET.
exports.create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Comment create GET');
};

// Handle Comment create on POST.
exports.create_post = function (req, res) {
    // res.send('NOT IMPLEMENTED: Comment create POST');
    CommentModel.create({
        user_id: req.body.user_id,
        username: req.body.username,
        title: req.body.title,
        content: req.body.content,
        created_utc: req.body.created_utc
    });
    console.log(req.body.title);
};

// Display Comment delete form on GET.
exports.delete_get = function (req, res) {
    // res.send('NOT IMPLEMENTED: Comment delete GET');
    CommentModel.deleteOne({ _id: req.params.id },
        function (err, data) {
            if (err)
                res.send(err);
            res.send(data);
        })
};

// Handle Comment delete on POST.
exports.delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Comment delete POST');
};

// Display Comment update form on GET.
exports.update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Comment update GET');
};

// Handle Comment update on POST.
exports.update_post = function (req, res) {
    // res.send('NOT IMPLEMENTED: Comment update POST');
    console.log("Update POST" + req.params.id);
    console.log(req.body.title);
    console.log(req.body.content);

    CommentModel.findByIdAndUpdate(req.params.id, req.body,
        function (err, data) {
            res.send(data);
        })
};
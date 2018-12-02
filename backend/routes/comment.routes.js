var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var commentCtrl = require('../controllers/comment.controller');

var auth = jwt({
    secret: require('../config/database').secret,
    userProperty: 'payload'
});

// function ownsPost(req, res, next) {
//     if(req.userId.isAdmin)
// }

// posts
router.get('/list', commentCtrl.list)
router.get('/:id', commentCtrl.detail);
router.post('/', commentCtrl.create_post);
// router.put('/:id', commentCtrl.update_post);
// router.delete('/:id', commentCtrl.delete_get);

// router.get('/user/:id/posts', commentCtrl.user_posts_get);
router.get('/post/:id/comments', commentCtrl.post_comments_get);

module.exports = router;

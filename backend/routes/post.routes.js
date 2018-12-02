var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var postCtrl = require('../controllers/post.controller');

var auth = jwt({
    secret: require('../config/database').secret,
    userProperty: 'payload'
});

// function ownsPost(req, res, next) {
//     if(req.userId.isAdmin)
// }

// posts
router.get('/list', postCtrl.list)
router.get('/:id', postCtrl.detail);
router.post('/', postCtrl.create_post);
router.put('/:id', postCtrl.update_post);
router.delete('/:id', postCtrl.delete_get);

router.get('/user/:id', postCtrl.user_posts_get);

module.exports = router;

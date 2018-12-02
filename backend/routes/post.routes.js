var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var postCtrl = require('../controllers/post.controller');

// bring in jwt but not yet implemented for these routes
var auth = jwt({
    secret: require('../config/database').secret,
    userProperty: 'payload'
});

// posts - default functionality
router.get('/list', postCtrl.list)
router.get('/:id', postCtrl.detail);
router.post('/', postCtrl.create_post);
router.put('/:id', postCtrl.update_post);
router.delete('/:id', postCtrl.delete_get);

// get the posts for a particular user
router.get('/user/:id', postCtrl.user_posts_get);

module.exports = router;

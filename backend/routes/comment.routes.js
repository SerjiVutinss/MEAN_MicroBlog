var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var commentCtrl = require('../controllers/comment.controller');

// bring in jwt but not yet implemented for these routes
var auth = jwt({
    secret: require('../config/database').secret,
    userProperty: 'payload'
});

// comments - default functionality
router.get('/list', commentCtrl.list)
router.get('/:id', commentCtrl.detail);
router.post('/', commentCtrl.create_post);
router.put('/:id', commentCtrl.update_post);
router.delete('/:id', commentCtrl.delete_get);

// get comments for a particular post
router.get('/post/:id', commentCtrl.post_comments_get);

module.exports = router;

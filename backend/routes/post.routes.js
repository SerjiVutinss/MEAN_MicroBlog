var express = require('express');
var router = express.Router();

var postCtrl = require('../controllers/post-controller');

// posts
router.get('/list', postCtrl.list)
router.get('/detail/:id', postCtrl.detail);
router.post('/', postCtrl.create_post);

module.exports = router;

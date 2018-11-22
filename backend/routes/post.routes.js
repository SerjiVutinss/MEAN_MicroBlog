var express = require('express');
var router = express.Router();

var postCtrl = require('../controllers/post-controller');

// posts
router.get('/list', postCtrl.list)
router.get('/:id', postCtrl.detail);
router.post('/', postCtrl.create_post);
router.put('/:id', postCtrl.update_post);
router.delete('/:id', postCtrl.delete_get);

module.exports = router;

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var userCtrl = require('../controllers/user.controller');

var auth = jwt({
    secret: require('../config/database').secret,
    userProperty: 'payload'
});

router.get('/list', userCtrl.list);
router.delete('/:id', userCtrl.delete_get);

module.exports = router;
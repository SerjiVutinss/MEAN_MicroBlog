var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var userCtrl = require('../controllers/user.controller');

// bring in jwt but not yet implemented for these routes
var auth = jwt({
    secret: require('../config/database').secret,
    userProperty: 'payload'
});

// users - default functionality
router.get('/list', userCtrl.list);
router.delete('/:id', userCtrl.delete_get);

module.exports = router;
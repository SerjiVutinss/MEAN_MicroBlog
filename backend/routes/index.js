var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
    secret: require('../config/database').secret,
    userProperty: 'payload'
});

var profileCtrl = require('../controllers/profile');
var authCtrl = require('../controllers/authentication');



// TEST ENDPOINT
/* GET home page. */
// router.get('/', function (req, res, next) {
//     console.log("ENDPOINT called");
//     res.send('Express RESTful API');
// });

router.get('/', function(req, res) {
    res.redirect('/home');
  });

// profile
router.get('/profile', auth, profileCtrl.profileRead);

// authentication
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);


module.exports = router;
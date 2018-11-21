var express = require('express');
var router = express.Router();

// TEST ENDPOINT
/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("ENDPOINT called");
    res.send('Express RESTful API');
});

module.exports = router;

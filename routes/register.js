
var express = require('express');
var router = express.Router();
var itemCounter = require('./constant');

//var counter = 0;
/* GET register page. */

router.get('/', function (req, res, next) {
    res.render('register', {
        title: 'register',
        item_counter: itemCounter.item_counter
    });
});

module.exports = router;
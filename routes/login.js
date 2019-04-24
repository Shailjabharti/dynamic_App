var express = require('express');
var router = express.Router();
var itemCounter = require('./constant');


var counter = 0;
/* GET login page. */

router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'login',
        item_counter: itemCounter.item_counter
    });
});


module.exports = router;
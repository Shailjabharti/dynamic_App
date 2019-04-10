var express = require('express');
var router = express.Router();

// data calling

var slides = require('../public/data/banners/index.get.json');
var productList = require('../public/data/products/index.get.json');


var prodCategories = require('../public/data/categories/index.get.json');

/* GET home page. */

router.get('/', function(req, res, next) {
 var ActiveBanners = slides.filter(slide => slide.isActive);
 var ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('index', {slides:ActiveBanners,categories:ActiveCategories});
});

/* GET product page. */

router.get('/product', function(req, res, next) {
  var productLists = productList.filter(category_list => category_list.category );  
  var ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('product', { title: 'product' , prod_List:productLists , cat_List:ActiveCategories});
});

/* GET login page. */

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});


/* GET register page. */

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'register' });
});

module.exports = router;

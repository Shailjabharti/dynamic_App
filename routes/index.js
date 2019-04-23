var express = require('express');
var router = express.Router();



var productInCart = [];
var counter = 0;

var slides = require('../public/data/banners/index.get.json');

var productList = require('../public/data/products/index.get.json');
var prodCategories = require('../public/data/categories/index.get.json');


// home

router.get('/', function (req, res, next) {
  var ActiveBanners = slides.filter(slide => slide.isActive);
  var ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('index', {
      slides: ActiveBanners,
      categories: ActiveCategories,
      counter: counter
  });

});





module.exports = router;

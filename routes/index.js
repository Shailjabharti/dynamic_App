var express = require('express');
var router = express.Router();

var productInCart = [];
var counter = 0;

// data calling

var slides = require('../public/data/banners/index.get.json');
var productList = require('../public/data/products/index.get.json');
var prodCategories = require('../public/data/categories/index.get.json');


// for sorting in order

prodCategories.sort(function (a, b) {
  return a.order - b.order;
});
/* GET home page. */

router.get('/', function (req, res, next) {
  var ActiveBanners = slides.filter(slide => slide.isActive);
  var ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('index', {
    slides: ActiveBanners,
    categories: ActiveCategories,
    counter: counter
  });

});

/* GET product page. */

router.get('/product', function (req, res, next) {
  var productLists = productList.filter(category_list => category_list.category);
  var ActiveCategories = prodCategories.filter(category => category.enabled);

  var ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('product', {
    title: 'product',
    cat_List: ActiveCategories,
    prod_List: productLists,
    counter: counter
  });
});

/* GET product filter. */

router.get('/product/:id', function (req, res, next) {
  var categoryId = req.params.id;

  var ActiveCategories = prodCategories.filter(category => category.enabled);
  var product_cat = productList.filter(product => product.category === categoryId);
  res.render('product', {
    cat_List: ActiveCategories,
    prod_List: product_cat,
    counter: counter
  })


});

/* GET login page. */

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'login',
    counter: counter
  });
});


/* GET register page. */

router.get('/register', function (req, res, next) {
  res.render('register', {
    title: 'register',
    counter: counter
  });
});

/* GET cart page. */

router.get('/cart', function (req, res, next) {
  var productLists = productList.filter(category_list => category_list.category);
  console.log("productInCart: ", productInCart);

  res.render('cart', {
    title: 'cart',
    prod_List: productLists,
    productInCart: productInCart,
    counter: counter
  });

});

router.get('/addtocart/:id/:operation', function (req, res) {
  console.log(req.params.id, req.params.operation);
  if (req.params.operation == "add") {
    productList.forEach(element => {
      if (element.id === req.params.id) {
        if (element.count == undefined) {
          element.count = 1;
          productInCart.push(element);
          counter = counter + 1;
          element.total_price = element.price;
        } else {
          element.count = element.count + 1;
          counter = counter + 1;
          element.total_price = element.count * element.price;
        }
      }
    });
    res.end(JSON.stringify({ 'cartItems': productInCart, 'counter': counter }));
  } else if (req.params.operation == "remove") {
    productList.forEach(element => {
      if (element.id === req.params.id) {
        if (element.count == undefined) {
          element.count = 0;
          productInCart.push(element);
          counter = 0;
          element.total_price = 0;
        } else {
          element.count = element.count - 1;
          counter = counter - 1;
          element.total_price = element.count * element.price;
        }

      }
    });
    res.end(JSON.stringify({ 'cartItems': productInCart, 'counter': counter }));
  }
});

router.get('/remove-item/:id/:operation', function (req, res) {
  productInCart.forEach(element => {
    if (element.id === req.params.id) {
      var removeIndex = productInCart.map(function (item) { return item.id; }).indexOf(req.params.id);
      productInCart.splice(removeIndex, 1);
      console.log(productInCart);
    }
  });
  res.end(JSON.stringify({ 'cartItems': productInCart, 'counter': counter }));
});





module.exports = router;

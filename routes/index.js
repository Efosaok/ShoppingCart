const express = require("express");
const router = express.Router();
const Cart = require("../models/OOPimplementation.js");
const Product = require("../models/appproduct.js");

router.get("/",(req,res)=>{
	res.render("register");
});

router.get("/additemtocart/:id",(req,res,next)=>{
	let productId = req.params.id;
	let cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId,(err,product)=>{
		if(err){
			return res.redirect("/users/product");
		}
		cart.add(product,product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect("/users/product");
	});
});

router.get('/shopping-cart', function(req, res, next) {
   if (!req.session.cart) {
       return res.render('../users/shop/shopping-cart', {products: null});
   } 
    var cart = new Cart(req.session.cart);
    res.render('/users/shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

module.exports = router

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
const express = require("express");
const router = express.Router();
const Cart = require("../models/OOPimplementation.js");
const Products = require("../models/appproduct.js");

router.get("/",(req,res)=>{
	res.render("login");
});

router.get('/product', (req, res)=>{
  Products.find((err,docs)=>{
    if (err) throw err;
    let productUnits = [];
    let unitSize = 20
    for(let counter = 0;counter < unitSize;counter += unitSize){
      productUnits.push(docs.slice(counter,counter + unitSize))
    }
    res.render("shop/product",{title: "WELCOME",products : productUnits})
    console.log(productUnits)
  })
});

router.get('/shopping-cart',(req, res, next)=> {
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   } 
    let cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/shopping-cart',(req, res, next)=> {
   if (!req.session.cart) {
       return res.render('/users/shop/shopping', {products: null});
   } 
    let cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get("/additem/:id",(req,res)=>{
	let productId = req.params.id;
	let cart = new Cart(req.session.cart ? req.session.cart:{});
	
	Products.findById(productId,(err,product)=>{
		if(err){
			return res.redirect("/product")
		}else{
			cart.add(product,product.id);
			req.session.cart = cart;
			res.redirect("/product")
		}
	})	
})


router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('shopping-cart');
});

router.get("/cartdetails",(req,res)=>{
	res.redirect("shop/shopping-cart")
})

module.exports = router

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
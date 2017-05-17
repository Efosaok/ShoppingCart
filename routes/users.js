const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');
const Products = require("../models/appproduct.js");


// Register
router.get('/register', (req, res)=>{
	res.render('register');
});

// Login
router.get('/login', (req, res)=>{
	res.render('login');
});
//products page
router.get('/product', (req, res)=>{
	Products.find((err,docs)=>{
		if (err) throw err;
		let productUnits = [];
		let unitSize = 20
		for(let counter = 0;counter < unitSize;counter += unitSize){
			productUnits.push(docs.slice(counter,counter + unitSize))
		}
		res.render("product",{title: "WELCOME",products : productUnits})
		console.log(productUnits)
	})
});

// Register User
router.post('/register', (req, res)=>{
	const name = req.body.name;
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	const errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		let newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, (err, user)=>{
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  (username, password, done)=> {
   User.getUserByUsername(username, (err, user)=>{
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, (err, isMatch)=>{
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  User.getUserById(id, (err, user)=> {
    done(err, user);
  });
});
//login route
router.post('/login',
  passport.authenticate('local', {successRedirect:'/users/product', failureRedirect:'/users/login',failureFlash: true}),
  (req, res)=> {
    res.redirect('/users/product');
  });
//logout route
router.get('/logout', (req, res)=>{
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});
//add item to cart route
router.get("/additem/:id",(req,res)=>{
	let productId = req.params.id;
	let cart = new Cart(req.session.cart ? req.session.cart:{});
	
	Products.findById(productId,(err,product)=>{
		if(err){
			return res.redirect("/")
		}else{
			cart.add(product,product.id);
			req.session.cart = cart;
			res.redirect("/")
		}
	})	
})
router.get('/shopping-cart',(req, res, next)=> {
   if (!req.session.cart) {
       return res.render('/users/shopping', {products: null});
   } 
    let cart = new Cart(req.session.cart);
    res.render('/users/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});


module.exports = router;
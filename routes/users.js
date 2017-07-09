const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

// Register
router.get('/register', (req, res)=>{
	res.render('register');
});

// Login
router.get('/login', (req, res)=>{
	res.render('login');
});

router.get("/home",(req,res)=>{
	res.render("index")
})
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

		req.flash('success_msg', 'You are now registered');

		res.redirect('/users/home');
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

router.post('/login',
  passport.authenticate('local', {successRedirect:'/users/home', failureRedirect:'/users/login',failureFlash: true}),
  (req, res)=> {
    res.redirect('users/home');
  });

router.get('/logout', (req, res)=>{
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

const convertCurrencies = (currencyToConvert,convertToCurrency,Amount)=>{
	let naira = {"dollar":0.0032,"euro":0.0028,"yen":0.36,"pounds":0.0024}
	let dollar = {"naira":315.25,"euro":0.88,'yen':112.04,"pounds":0.77}
	let pounds = {"yen":145.36,"euro":1.14,"dollar":1.30,"naira":409.10}
	let euro = {"yen":127.73,"pounds":0.88,"dollar":1.14,"naira":359.48}
	let yen = {"pounds":0.0069,"dollar":0.0089,"naira":2.82,"euro":0.0078}

	if(currencyToConvert === "naira"){
		return naira[convertToCurrency] * parseFloat(Amount)
	}
	else if(currencyToConvert === "dollar"){
		return dollar[convertToCurrency] * parseFloat(Amount)
	}
	else if(currencyToConvert === "pounds"){
		return pounds[convertToCurrency] * parseFloat(Amount)
	}
	else if (currencyToConvert === "euro"){
		return euro[convertToCurrency] * parseFloat(Amount)
	}
	else{
		return yen[convertToCurrency] * parseFloat(Amount)
	}
}
router.get("/convertcurrency",(req,res)=>{
	a = req.body.amount
	b = req.body.myselect
	c = req.body.myconvert
	console.log(convertCurrencies(b,c,a))
})

module.exports = router;

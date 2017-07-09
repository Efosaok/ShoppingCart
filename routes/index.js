const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/",(req,res)=>{
	res.render("register");
});

router.get("/home",(req,res)=>{
	res.render("index")
});

module.exports = router;

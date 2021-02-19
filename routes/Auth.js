const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtSecretKey} = require('../config');

const router = express.Router();

const User = mongoose.model('User');


router.post('/register', async (req, res) => {
	const {name, email, password} = req.body;
	try{
		const user = new User({name, email, password});
		await user.save();
		const token = jwt.sign({userId: user._id}, jwtSecretKey);
		res.send({token});
	} catch (err) {
		return res.status(422).send(err.message)
	}
});

router.post('/login', async (req, res) => {
	const {email, password} = req.body;
	if (!email || !password) {
		return res.status(422).send({error: "Email and password is required !"});
	}
	const user = await User.findOne({email});
	if (!user) {
		return res.status(422).send({error: "Email and password is required !"});
	}
	try{
		await user.comparePassword(password);
		const token = jwt.sign({userId: user._id}, jwtSecretKey);
		res.send({token});
	} catch (err) {
		return res.status(422).send({error: "Email and password is required !"});
	}
})

module.exports = router;
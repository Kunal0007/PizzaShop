const express = require("express");

// module for using user Schema
const User = require("../model/userSchema");

// module for creating diff api's
const router = express.Router();

// module for validation of credentails
const { body, validationResult } = require('express-validator');

// module for hashing password
const bcrypt = require('bcryptjs');

// module for jwt 
var jwt = require('jsonwebtoken');
const SECRET_KEY = 'MYNAMEISKUNALPATILANDTHISISSHOPPINGAPP';

// module for middleware fetchUser
const fetchUser = require("../middleware/fetchuser");


// Creating api at '/api/auth/createuser' 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Make a strong password').isLength({ min: 5 })
], async (req, res) => {

    let success = false;

    // Checking errors in credentials
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Finding already existing user 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: 'User already exists!!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(req.body.password, salt);

        // Creating new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashpass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, SECRET_KEY);

        success = true;
        res.json({ success, authtoken });

    } catch (error) {

        // Catching error occured in server
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


// Creating api at '/api/auth/login'
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    // Checking errors in credentials
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let success = false;

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid Credentials!!' });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            success = false;
            return res.status(400).json({ success, error: 'Invalid Credentials!!' });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, SECRET_KEY);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        // Catching error occured in server
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Creating api at '/api/auth/getuser'
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        // Catching error occured in server
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
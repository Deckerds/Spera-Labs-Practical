const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const User = require('../models/User');

// @route   POST api/users
// @desc    Register an user
// @access  Public

router.post('/', [
    //Email Address Validation
    body('email', 'Must be a valid email address').isEmail(),
    //Password Characters Length Validation
    body('password', 'Password must be 8 characters or more').isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, phone, address, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User Already Exists' });
        }

        user = new User({
            firstName,
            lastName,
            email,
            phone,
            address,
            password
        });

        //Storing password in hash using bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    };

});

module.exports = router;
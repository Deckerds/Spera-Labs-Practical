const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route   api/users
// @desc    Get logged in User
// @access  Private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById((req.user.id)).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server Error' });
    };
});

// @route   api/users
// @desc    Authorize user get Token
// @access  Public

router.post('/', [
    //Email Address Validation
    check('email', 'Must be a valid Email Address').isEmail(),
    //Password Characters Length Validation
    check('password', 'Password must be more than 8 characters long').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not Exist!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        };

        let payload = {
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
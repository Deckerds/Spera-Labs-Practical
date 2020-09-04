const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

const Product = require('../models/Product');


// @routes  api/products
// @desc    Get Products
// @access  Private

router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.find({ userId: req.user.id }).sort({ data: -1 });
        res.json(products);
    } catch (err) {
        console.log(err.message);
        res.status(400).send('Server Error');
    };
});

// @route   api/products
// @desc    Add a product
// @access  Private

router.post('/', [auth, [
    //Product fields validation
    body('name', 'Product name cannot be empty').not().isEmpty(),
    body('description', 'Product description cannot be empty').not().isEmpty(),
    body('quantity', 'Product quantity cannot be empty').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const { name, description, quantity } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            quantity,
            userId: req.user.id
        });

        const products = await newProduct.save();
        res.json(products);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    };

});

// @route   api/products
// @desc    Update a product
// @access  Private

router.put('/:id', auth, async (req, res) => {
    const { name, description, quantity } = req.body;
    const productFields = {};
    if (name) productFields.name = name;
    if (description) productFields.description = description;
    if (quantity) productFields.quantity = quantity;
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        };
        if (product.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        };
        product = await Product.findByIdAndUpdate(req.params.id, { $set: productFields }, { new: true });
        res.json(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    };
});

// @route   api/products
// @desc    Delete a product
// @access  Private

router.delete('/:id', auth, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        };
        if (product.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        };
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    };
});

module.exports = router;
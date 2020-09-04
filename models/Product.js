const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);
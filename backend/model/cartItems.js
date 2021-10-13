const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
    },
    productbyId: {
        type: Object,
        required: true
    },
    id: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },

    // price: {
    //     type: Number,
    //     required: true,
    // },
    // image: {
    //     type: String,
    //     required: true,
    // },
})

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
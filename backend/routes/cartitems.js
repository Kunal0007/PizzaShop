const express = require("express");

// module for creating diff api's
const router = express.Router();

// module for middleware fetchUser
const fetchUser = require("../middleware/fetchuser");

// module for using cart Schema
const Cart = require("../model/cartItems");

const product = require("../model/product");

let total = 0;

// Creating api at '/api/cart/addItem' 
router.post('/addItem', fetchUser, async (req, res) => {
    try {
        const { id, quantity } = req.body;

        const items = await Cart.find({ user: req.user.id });
        if (items.find(item => item.id === id)) {
            let setQuantity = items.find(item => item.id === id).quantity + 1;
            console.log(setQuantity);
            const item = await Cart.findOneAndUpdate({ id: id }, { quantity: setQuantity }, { new: true });
            const savedItem = await item.save();
            console.log(savedItem);
            res.json(savedItem);
        }

        else {
            const productbyId = await product.findById(id);
            console.log(productbyId);
            const item = new Cart({
                productbyId, id, quantity, user: req.user.id
            })
            const savedItem = await item.save();

            res.json(savedItem);
        }


    } catch (error) {

        // Catching error occured in server
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Creating api at '/api/cart/removeItem' 
router.post('/removeItem', fetchUser, async (req, res) => {
    try {
        const { id, quantity } = req.body;

        const items = await Cart.find({ user: req.user.id });
        if (items.find(item => item.id === id)) {
            // items.find(item => item.id === id);
            // var setQuantity = items.find(item => item.id === id);
            // setQuantity
            if (items.find(item => item.id === id).quantity > 1) {
                let setQuantity = items.find(item => item.id === id).quantity - 1;
                let item = await Cart.findOneAndUpdate({ id: id }, { quantity: setQuantity }, { new: true });
                res.json({ item });
            }
            else {
                res.status(401).send("Item can't be less than 1");
            }
        }
        else {
            res.status(404).send("Item Not Found!!");
        }

    } catch (error) {

        // Catching error occured in server
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Creating api at '/api/cart/fetchallItems' 
router.get('/fetchallItems', fetchUser, async (req, res) => {
    try {
        const items = await Cart.find({ user: req.user.id });
        res.json(items);
    } catch (error) {

        // Catching error occured in server
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/totalSum', fetchUser, async (req, res) => {
    try {
        const items = await Cart.find({ user: req.user.id });
        let total = 0;
        items.forEach(item => total += (item.quantity * item.productbyId.price));
        res.json(total);
    } catch (error) {

        // Catching error occured in server
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Creating api at '/api/cart/deleteitem/:id' 
router.delete('/deleteitem/:id', fetchUser, async (req, res) => {

    try {
        let item = await Cart.findById(req.params.id);

        if (!item) {
            return res.status(404).send("Not Found!!")
        }

        if (item.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!!")
        }

        item = await Cart.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Item is deleted!!", item });
    } catch (error) {

        // Catching error occured in server
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})


module.exports = router;
const product = require("../model/product");

const getAllProducts = async (req, res) => {
    try {
        const products = await product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getProductyId = async (req, res) => {
    try {
        const productbyId = await product.findById(req.params.id);
        res.json(productbyId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// const getCartItems = async (req, res) => {
//     try {
//         // const products = await product.find({});
//         const cart_ids = req.body.ids;
//         const cartproducts = cart_ids.map(async (id) => {
//             const productbyId = await product.findById(id);
//             return productbyId;
//         })
//         res.json(cartproducts);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// }

module.exports = {
    getAllProducts,
    getProductyId,
}
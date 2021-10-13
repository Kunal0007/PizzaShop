const express = require("express");

// module for creating diff api's
const router = express.Router();

const { getAllProducts, getProductyId, getCartItems } = require("../Controller/productControllers")

// Get all products from db
// Get /api/produts
router.get('/', getAllProducts);

// Get a products from db by its id
// Get /api/products/:id
router.get('/:id', getProductyId);


// router.get('/cart-items', getCartItems);

module.exports = router;



// app.post("/cart-items", (req, res) => {
//     const cart_ids = req.body.ids;
//     // console.log(cart_ids);

//     fs.readFile(__dirname + "/" + "pizza.json", "utf8", (err, data) => {
//       var object = JSON.parse(data);
//       var cart = getcartProduct(object, cart_ids);
//       // console.log(cart);
//       var cartObject = JSON.stringify(cart);
//       // console.log(cartObject);
//       res.end(cartObject);
//     });
//     // res.end(JSON.stringify(req.body));
//   })

//   function getcartProduct(x, cart_ids) {
//     const cartproducts = cart_ids.map(id => {
//       var a = x.find(y => y._id === id);
//       return a;
//     })
//     return (cartproducts);
//   }
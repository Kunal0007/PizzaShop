const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 5000
const cors = require("cors");

app.use(cors());

app.use(express.static('data'));
app.use('/product',express.static('data'));

app.use(express.json());

const connectToMg = require("./db/conn");
connectToMg();

app.use('/api/auth', require("./routes/auth"));

app.use('/api/cart', require("./routes/cartitems"));

app.use('/api/products', require("./routes/productRoutes"));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
  });
}


app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});


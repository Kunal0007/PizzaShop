require("dotenv").config();

const productData = require("./data/products");

const connectToMg = require("./db/conn");

const product = require("./model/product");

connectToMg();

const importData = async () => { 
   
    try {
       
        await product.deleteMany({});

        await product.insertMany(productData);
 
        console.log("Data Import Success");

        process.exit();
    } catch (error) {
        console.error("Error with data import", error);
        process.exit(1);
    }
}

importData();
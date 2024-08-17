var express = require("express");
var router = express.Router();
var productController = require("../controllers/product.controller");

// Middleware to disable CORS
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

router.get("/getAllProducts", (req, res, next) => {
    const products = productController.getAllProducts();
    res.send(products);
})

router.post("/", (req, res, next) => {
    const newProduct = req.body;
    console.log(newProduct);
    const products = productController.addProduct(newProduct);
    res.json(products);
})

router.put("/", (req, res) => {
    const updatedData = req.body;
    const updatedProduct = productController.updateProduct(updatedData);
    res.json(updatedProduct);
})

router.delete("/", (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    productController.removeProduct(id);
    res.sendStatus(204);
})

module.exports = router;
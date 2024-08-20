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

// Error handling middleware
const handleError = (error, res) => {
    console.error(error.message);  // Log the error message
    res.status(error.statusCode || 500).json({ message: error.message || 'An unexpected error occurred' });
};

/**
 * @swagger
 * /api/getAllProducts:
 *   get:
 *     summary: Retrieve all products
 *     description: Get a list of all products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/getAllProducts", async (req, res) => {
    try {
        const products = await productController.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        handleError(error, res);
    }
});


/**
 * @swagger
 * /api:
 *   post:
 *     summary: Add a new product
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        const products = await productController.addProduct(newProduct);
        res.status(201).json(products);
    } catch (error) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api:
 *   put:
 *     summary: Update a product
 *     description: Update an existing product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.put("/", async (req, res) => {
    try {
        const updatedData = req.body;
        const updatedProduct = await productController.updateProduct(updatedData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * /api:
 *   delete:
 *     summary: Delete a product
 *     description: Delete an existing product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       204:
 *         description: Product successfully deleted
 */
router.delete("/", async (req, res) => {
    try {
        const { id } = req.body;
        await productController.removeProduct(id);
        res.sendStatus(204);
    } catch (error) {
        handleError(error, res);
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         unitPrice:
 *           type: number
 *         quantity:
 *           type: number
 */

module.exports = router;

const express = require('express');
const request = require('supertest');
const productRouter = require('../routes/api');  // Adjust the path as needed
const productController = require('../controllers/product.controller');  // Adjust the path as needed

// Mock the product controller
jest.mock('../controllers/product.controller');

describe('Product Router', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/api/products', productRouter);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return all products', async () => {
        const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
        productController.getAllProducts.mockResolvedValue(mockProducts);

        const response = await request(app).get('/api/products/getAllProducts');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it('should handle errors', async () => {
        const errorMessage = 'Database error';
        productController.getAllProducts.mockRejectedValue(new Error(errorMessage));

        const response = await request(app).get('/api/products/getAllProducts');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: errorMessage });
    });

    it('should add a new product', async () => {
        const newProduct = { name: 'New Product', price: 9.99 };
        const addedProduct = { id: 3, ...newProduct };
        productController.addProduct.mockResolvedValue(addedProduct);

        const response = await request(app)
            .post('/api/products')
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(addedProduct);
    });

    it('should handle errors when adding a product', async () => {
        const errorMessage = 'Invalid product data';
        productController.addProduct.mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .post('/api/products')
            .send({ name: 'Invalid Product' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: errorMessage });
    });

    it('should update a product', async () => {
        const updatedProduct = { id: 1, name: 'Updated Product', price: 19.99 };
        productController.updateProduct.mockResolvedValue(updatedProduct);

        const response = await request(app)
            .put('/api/products')
            .send(updatedProduct);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedProduct);
    });

    it('should handle errors when updating a product', async () => {
        const errorMessage = 'Product not found';
        productController.updateProduct.mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .put('/api/products')
            .send({ id: 999, name: 'Non-existent Product' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: errorMessage });
    });

    it('should remove a product', async () => {
        productController.removeProduct.mockResolvedValue();

        const response = await request(app)
            .delete('/api/products')
            .send({ id: 1 });

        expect(response.status).toBe(204);
    });

    it('should handle errors when removing a product', async () => {
        const errorMessage = 'Product not found';
        productController.removeProduct.mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .delete('/api/products')
            .send({ id: 999 });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: errorMessage });
    });

    it('should set CORS headers', async () => {
        const response = await request(app).options('/api/products');

        expect(response.headers['access-control-allow-origin']).toBe('*');
        expect(response.headers['access-control-allow-headers']).toBe('Origin, X-Requested-With, Content-Type, Accept');
        expect(response.headers['access-control-allow-methods']).toBe('GET, POST, PUT, DELETE, OPTIONS');
    });
});
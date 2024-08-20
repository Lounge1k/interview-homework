const productController = require('../controllers/product.controller');

describe('Product Controller', () => {
    it('should return all products', () => {
        const newProduct = {
            name: "new product",
            quantity: 5,
            unitPrice: 10
        };
        jest.spyOn(Date, 'now').mockImplementation(() => 1234567890);
        productController.addProduct(newProduct)
        const result = productController.getAllProducts();
        expect(result).toEqual([expect.objectContaining({
            id: 1234567890,
            ...newProduct
        })]);
    });

    it('should add a new product', () => {
        const newProduct = {
            name: "mock",
            quantity: 5,
            unitPrice: 10
        };

        jest.spyOn(Date, 'now').mockImplementation(() => 1);

        const result = productController.addProduct(newProduct);

        expect(result).toHaveLength(2);
        expect(result[1]).toEqual(expect.objectContaining(newProduct));
        productController.removeProduct(1234567890);
    });

    it('should update an existing product', () => {
        const updatedData = {
            id: 1,
            name: "updated mock",
            quantity: 2,
            unitPrice: 10
        };

        const result = productController.updateProduct(updatedData);

        expect(result).toEqual({
            id: 1,
            name: "updated mock",
            quantity: 2,
            unitPrice: 10
        });
    });

    it('should return undefined when updating non-existent product', () => {
        const updatedData = {
            id: 999,
            name: "non-existent product"
        };

        expect(() => {
            productController.updateProduct(updatedData);
        }).toThrow('Product with id 999 not found');
    });

    it('should not change products when removing non-existent id', () => {
        const length = productController.getAllProducts().length;
        productController.removeProduct(999);

        const remainingProducts = productController.getAllProducts();
        expect(remainingProducts).toHaveLength(length);
    });

    it('should remove a product', () => {
        const id = productController.getAllProducts()[0].id
        productController.removeProduct(id);

        const remainingProducts = productController.getAllProducts();
        expect(remainingProducts).toHaveLength(0);
    });
});
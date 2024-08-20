let products = [];

const getAllProducts = () => {
    // TODO: get products from DB
    return products;
}

const addProduct = (product) => {
    // TODO: add prodcut to DB
    products.push({
        id: Date.now(), // simulate unique id,
        ...product
    })
    return products;
}

const updateProduct = (updatedData) => {
    // TODO: update product in disable
    const { id, ...fields } = updatedData;
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        throw new Error(`Product with id ${id} not found`);
    }

    products[productIndex] = {
        ...products[productIndex],
        ...fields
    };

    return products[productIndex];
}

const removeProduct = (id) => {
    // TODO: delete item from DB
    products = products.filter(product => product.id !== id);
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    removeProduct
}
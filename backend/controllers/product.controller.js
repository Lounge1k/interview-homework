const products = [{
    id: 1,
    name: "mock",
    description: "mock",
    quantity: 1,
    unitPrice: 5
}];
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

module.exports = {
    getAllProducts,
    addProduct
}
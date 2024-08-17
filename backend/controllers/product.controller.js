const products = [{
    id: 1,
    name: "mock",
    description: "mock",
    quantity: 1,
    unitPrice: 4
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

const updateProduct = (updatedData) => {
    // TODO: update product in disable
    const { id, ...fields } = updatedData;
    console.log(fields);
    const updatedProduct = products.find(product => product.id === id);
    return {
        ...updatedProduct,
        ...fields
    };
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct
}
const { ObjectId } = require("mongodb");


class CartService {
    constructor(client) {
        this.Cart = client.db().collection("cart");
    }

    async create(customer_id) {
        return await this.Cart.insertOne({ customer_id: ObjectId.isValid(customer_id) ? new ObjectId(customer_id) : null, products: [] });
    }

    async findByCustomerId(customer_id) {
        // console.log(customer_id);
        return await this.Cart.findOne({ customer_id: ObjectId.isValid(customer_id) ? new ObjectId(customer_id) : null });
    }

    async addToCart(customer_id, product, quantity) {
        const existingCart = await this.findByCustomerId(customer_id);
        if (!existingCart) {
            await this.create(customer_id);
        }
        const cart = await this.findByCustomerId(customer_id);

        const productIndex = cart.products.findIndex(element => element._id.toString() === product._id.toString());

        if (productIndex === -1) {
            return await this.Cart.updateOne(
                { customer_id: new ObjectId(customer_id) },
                { $push: { products: { ...product, quantity: quantity } } }
            );
        } else {
            const products = [...cart.products];
            products[productIndex].quantity += quantity;
            return await this.Cart.updateOne(
                { customer_id: new ObjectId(customer_id) },
                { $set: { products: products } }
            );
        }
    }

    async updateProductToCart(customer_id, product_id, quantity) {
        const cart = await this.findByCustomerId(customer_id);

        const productIndex = cart.products.findIndex(element => element._id.toString() === product_id);

        const products = [...cart.products];
        console.log(quantity);
        products[productIndex].quantity = quantity;
        return await this.Cart.updateOne(
            { customer_id: new ObjectId(customer_id) },
            { $set: { products: products } }
        );
    }


    async deleteProductFromCart(customer_id, product_id) {
        const cart = await this.findByCustomerId(customer_id);

        const productIndex = cart.products.findIndex(product => product._id.toString() === product_id);

        if (productIndex === -1) {
            console.log('Product not found in cart');
        }

        cart.products.splice(productIndex, 1);
        console.log(1111);

        return await this.Cart.updateOne(
            { customer_id: ObjectId.isValid(customer_id) ? new ObjectId(customer_id) : null },
            { $set: { products: cart.products } }
        );
    }

    async deleteAllProductFromCart(customer_id) {
        return await this.Cart.updateOne(
            { customer_id: ObjectId.isValid(customer_id) ? new ObjectId(customer_id) : null },
            { $set: { products: [] } }
        );
    }


}
module.exports = CartService;
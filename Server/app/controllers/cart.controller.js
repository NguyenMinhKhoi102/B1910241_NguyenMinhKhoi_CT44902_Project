const jwt = require("jsonwebtoken");
const jwtSecret = "mysecretkey";
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const CartService = require("../services/cart.service");
const ProductService = require("../services/product.service");


exports.addCart = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const productService = new ProductService(MongoDB.client);

        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);
        const { product_id, quantity } = req.body;

        const product = await productService.findById(product_id);
        await cartService.addToCart(decodedToken.id, product, quantity);

        return res.send({ message: "addCart successfully" });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while add Cart"));
    }
}

exports.update = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);

        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);
        const { product_id, quantity } = req.body;

        await cartService.updateProductToCart(decodedToken.id, product_id, quantity);
        return res.send({ message: "update cart successfully" });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while edit Cart"));
    }
}

exports.find = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);
        const result = await cartService.findByCustomerId(decodedToken.id);
        return res.send(result);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while add Cart"));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);
        const product_id = req.params.product_id;
        console.log(decodedToken)

        const result = await cartService.deleteProductFromCart(decodedToken.id, product_id);
        if (result)
            return res.send({ message: "Xoá sản khỏi giỏ hàng thành công" });
        return res.send({ message: "Sản phẩm không tồn tại trong giỏ" });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while add Cart"));
    }
}
exports.deleteAll = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);
        const result = await cartService.deleteAllProductFromCart(decodedToken.id);
        if (result)
            return res.send({ message: "Xoá thành công" });
        return res.send({ message: "Giỏ hàng rỗng" });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while add Cart"));
    }
}


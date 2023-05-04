const express = require("express");
const cart = require("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .get(cart.find)
    .post(cart.addCart)
    .patch(cart.update)
    .delete(cart.deleteAll);


router.route("/:product_id")
    .delete(cart.delete);

module.exports = router;
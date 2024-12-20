const express = require("express");
const {
  getAllItemsFromCart,
  addItemToCart,
  updateCartItemQuantity,
  deleteItemfromCart,
} = require("../controllers/cart");
const router = express.Router();

router.get("/:userId", getAllItemsFromCart);
router.post("/:userId", addItemToCart);
router.patch("/:userId/:foodId", updateCartItemQuantity);
router.delete("/:userId/:foodId", deleteItemfromCart);

module.exports = router;

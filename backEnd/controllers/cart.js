const Cart = require("../models/cart");

exports.getAllItemsFromCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.foodId"); // Here we have the items key of the cart schema with a foodId with it.
    if (!cart) {
      return res.status(404).send({ message: "Cart not found", error: true });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send({ message: "Failed to get cart items", error: true });
  }
};

exports.addItemToCart = async (req, res) => {
  const { userId } = req.params;
  const { foodId, name, price, image, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex((item) =>
      item.foodId.equals(foodId)
    );
    //checking if the food item is already present in the items array and if it exists in the cart, will increase the quantity by 1.
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ foodId, name, price, image, quantity: 1 });
    }
    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to add item to cart", error: error.message });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  const { foodId, userId } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found", error: true });
    }
    const item = cart.items.find((item) => item.id === foodId);
    if (!item) {
      return res
        .status(404)
        .send({ message: "Item not found in cart", error: true });
    }
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Item quantity updated", cart });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Failed to find cart", error: true });
  }
};

exports.deleteItemfromCart = async (req, res) => {
  const { foodId, userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found", error: true });
    }
    cart.items = cart.items.filter((item) => !item.foodId.equals(foodId));
    await cart.save();
    res.status(200).json({ message: "Item deleted from cart", cart });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to delete item from cart", error: true });
  }
};

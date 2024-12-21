const Cart = require("../models/cart");

exports.getAllItemsFromCart = async (req, res) => {
  const { userId } = req.params;
  // console.log(userId);
  try {
    let cart = await Cart.findOne({ userId });
    // .populate("items.foodId"); // Here we have the items key of the cart schema with a foodId with it.
    if (!cart) {
      return res.status(404).send({ message: "Cart not found", error: true });
    }
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: "Failed to get cart items", error: true });
  }
};

exports.addItemToCart = async (req, res) => {
  const { userId } = req.params;
  const { foodId, name, price, image, quantity } = req.body;
  try {
    console.log("Trying to add");

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });

    // If no cart exists, create a new one
    if (!cart) {
      console.log("Cart not found with this userId");
      cart = await Cart.create({ userId, items: [] });
      console.log("Cart created");
    }

    // Find the index of the item in the cart
    const itemIndex = cart.items.findIndex((item) =>
      item.foodId.equals(foodId)
    );

    // Check if the food item already exists
    if (itemIndex > -1) {
      // If exists, increment the quantity
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      // If not, add the new item to the cart
      cart.items.push({ foodId, name, price, image, quantity: 1 });
    }

    // Save the cart
    await cart.save();
    console.log(cart);

    // Send a successful response
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.log("Error occurred:", error);
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

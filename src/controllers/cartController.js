import cartService from "../services/cartService.js";

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const result = await cartService.addToCart(req.user.id, productId, quantity);
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
};

const removeFromCart = async (req, res) => {
  const cartItemId = parseInt(req.params.id, 10);
  const result = await cartService.removeFromCart(cartItemId, req.user.id);
  if (result.success) {
    res.status(204).send();
  } else {
    res.status(400).json(result);
  }
};

export default { addToCart, removeFromCart };

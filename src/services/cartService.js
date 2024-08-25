import Joi from "joi";
import cartRepository from "../repositories/cartRepository.js";

// Validation schemas
const addToCartSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().positive().required(),
});

const addToCart = async (buyerId, productId, quantity) => {
  // Validate the payload
  const { error } = addToCartSchema.validate({ productId, quantity });
  if (error) {
    return { success: false, error: error.details[0].message };
  }

  try {
    const cartItem = await cartRepository.createCartItem(
      buyerId,
      productId,
      quantity
    );
    return { success: true, cartItem };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const removeFromCart = async (cartItemId, buyerId) => {
  try {
    const cartItem = await cartRepository.findCartItemById(cartItemId);

    if (!cartItem || cartItem.buyerId !== buyerId) {
      throw new Error("Unauthorized or cart item not found");
    }

    await cartRepository.deleteCartItem(cartItemId);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default { addToCart, removeFromCart };

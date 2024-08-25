import { db } from "../db.js";
import { cartItems } from "../schema.js";

const createCartItem = async (buyerId, productId, quantity) => {
  return db
    .insert(cartItems)
    .values({ buyerId, productId, quantity })
    .returning("*")
    .execute();
};

const findCartItemById = async (cartItemId) => {
  const cartItem = await db
    .select(cartItems)
    .where(cartItems.id.eq(cartItemId))
    .execute();
  return cartItem.length ? cartItem[0] : null;
};

const deleteCartItem = async (cartItemId) => {
  return db.delete(cartItems).where(cartItems.id.eq(cartItemId)).execute();
};

export default {
  createCartItem,
  findCartItemById,
  deleteCartItem,
};

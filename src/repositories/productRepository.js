import { db } from "../db/db.js";
import { products } from "../db/schema.js";

const createProduct = async (productData) => {
  console.log({productData})
  return db.insert(products).values(productData).returning();
};

const findProductById = async (productId) => {
  const product = await db
    .select(products)
    .where(products.id.eq(productId))
    .execute();
  return product.length ? product[0] : null;
};

const updateProduct = async (productId, productData) => {
  return db
    .update(products)
    .set(productData)
    .where(products.id.eq(productId))
    .returning("*")
    .execute();
};

const deleteProduct = async (productId) => {
  return db.delete(products).where(products.id.eq(productId)).execute();
};

const searchProducts = async (name, category) => {
  let query = db.select().from(products);

  if (name) {
    query = query.where(like(products.name, `%${name}%`));
  }

  if (category) {
    query = query.where(eq(products.category, category));
  }

  const result = await query;
  return result;
};

export default {
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};

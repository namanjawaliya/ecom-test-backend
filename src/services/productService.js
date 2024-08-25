import Joi from "joi";
import productRepository from "../repositories/productRepository.js";

// Validation schemas
const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  category: Joi.string().min(3).max(50).required(),
  description: Joi.string().allow("").optional(),
  price: Joi.number().positive().required(),
  discount: Joi.number().min(0).max(100).optional(),
  thumbnail: Joi.string().required(),
  images: Joi.array().items(Joi.string()).optional(),
});

const addProduct = async (payload, sellerId) => {
  // Validate the payload
  const { error } = productSchema.validate(payload);
  if (error) {
    return { success: false, error: error.details[0].message };
  }

  try {
    const product = await productRepository.createProduct({
      ...payload,
      sellerId,
    });
    return { success: true, product };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const updateProduct = async (productId, payload, sellerId) => {
  // Validate the payload
  const { error } = productSchema.validate(payload);
  if (error) {
    return { success: false, error: error.details[0].message };
  }

  try {
    const product = await productRepository.findProductById(productId);

    if (!product || product.sellerId !== sellerId) {
      throw new Error("Unauthorized or product not found");
    }

    const updatedProduct = await productRepository.updateProduct(
      productId,
      payload
    );
    return { success: true, product: updatedProduct };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const deleteProduct = async (productId, sellerId) => {
  try {
    const product = await productRepository.findProductById(productId);

    if (!product || product.sellerId !== sellerId) {
      throw new Error("Unauthorized or product not found");
    }

    await productRepository.deleteProduct(productId);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const searchProducts = async (name, category) => {
  try {
    const products = await productRepository.searchProducts(name, category);
    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default { addProduct, updateProduct, deleteProduct, searchProducts };

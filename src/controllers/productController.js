import productService from "../services/productService.js";

const addProduct = async (req, res) => {
  const result = await productService.addProduct(req.body, req.user.id);
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
};

const updateProduct = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const result = await productService.updateProduct(
    productId,
    req.body,
    req.user.id
  );
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const deleteProduct = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const result = await productService.deleteProduct(productId, req.user.id);
  if (result.success) {
    res.status(204).send();
  } else {
    res.status(400).json(result);
  }
};

const searchProducts = async (req, res) => {
  const { name, category } = req.query;
  const result = await productService.searchProducts(name, category);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

export default { addProduct, updateProduct, deleteProduct, searchProducts };

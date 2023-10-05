// products.router.js
import express from 'express';
import ProductsController from '../controllers/products.controller.js';

const router = express.Router();
const productsController = new ProductsController(); 

router.get("/", async (req, res) => {
    await productsController.getProducts(req, res);
});

router.post("/", async (req, res) => {
    await productsController.createProduct(req, res);
});

router.put('/:id', async (req, res) => {
    await productsController.updateProduct(req, res);
});

router.delete('/:id', async (req, res) => {
    await productsController.deleteProduct(req, res);
});

router.get("/:id", async (req, res) => {
    await productsController.getProductById(req, res);
});

export default router;

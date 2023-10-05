import express from 'express';
import CartsController from '../controllers/carts.controller.js';

const router = express.Router();
const cartsController = new CartsController();

router.post('/', async (req, res) => {
    await cartsController.createCart(req, res);
});

router.get('/:cartId', async (req, res) => {
    await cartsController.getCart(req, res);
});

router.put('/:cartId', async (req, res) => {
    await cartsController.updateCart(req, res);
});

router.delete('/:cartId', async (req, res) => {
    await cartsController.deleteCart(req, res);
});

export default router;

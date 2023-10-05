import CartsService from '../services/db/carts.service.js';

class CartsController {
    constructor() {
        this.cartsService = new CartsService();
    }

    async createCart(req, res) {
        try {
            const { products } = req.body;
            const cart = await this.cartsService.createCart(products);
            res.status(201).json(cart);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating cart' });
        }
    }

    async getCart(req, res) {
        try {
            const { cartId } = req.params;
            const cart = await this.cartsService.getCartById(cartId);
            res.json(cart);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving cart' });
        }
    }

    async updateCart(req, res) {
        try {
            const { cartId } = req.params;
            const updatedProducts = req.body.products;
            const updatedCart = await this.cartsService.updateCart(cartId, updatedProducts);
            res.json(updatedCart);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating cart' });
        }
    }

    async deleteCart(req, res) {
        try {
            const { cartId } = req.params;
            const deletedCart = await this.cartsService.deleteCart(cartId);
            res.json(deletedCart);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting cart' });
        }
    }
}

export default CartsController;

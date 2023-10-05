import CartsModel from './models/cartsmodel.js';

export default class CartsService {
    constructor() {
        console.log("Calling carts model using a service.");
    }

    async createCart(products) {
        try {
            const cart = await CartsModel.create({ products });
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartsModel.findById(cartId).populate('products.product', 'name price');
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cartId, updatedProducts) {
        try {
            const updatedCart = await CartsModel.findByIdAndUpdate(cartId, { products: updatedProducts }, { new: true });
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    async deleteCart(cartId) {
        try {
            const deletedCart = await CartsModel.findByIdAndDelete(cartId);
            return deletedCart;
        } catch (error) {
            throw error;
        }
    }
}

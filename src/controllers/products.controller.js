import ProductsService from '../services/db/products.service.js';

class ProductsController {
    constructor() {
        this.productService = new ProductsService();
    }

    async getProducts(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            const sort = req.query.sort === 'desc' ? -1 : 1;
            const query = req.query.query || '';
            const category = req.query.category || '';
            const availability = req.query.availability || '';
            const filter = {
                limit,
                page,
                sort,
                query,
                category,
                availability
            };
            const products = await this.productService.getAllProducts(filter);

            const response = {
                status: 'success',
                payload: products,
            };

            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Error retrieving products' });
        }
    }

    async createProduct(req, res) {
        try {
            const productData = req.body;
            const result = await this.productService.saveProduct(productData);
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating product' });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const productData = req.body;
            const result = await this.productService.updateProduct(id, productData);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating product' });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const result = await this.productService.deleteProduct(id);
            res.json({ message: 'Product deleted successfully', deletedProduct: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting product' });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving product by ID' });
        }
    }
}

export default ProductsController;

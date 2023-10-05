import Product from './models/productsmodel.js';

export default class ProductsService {
    constructor() {
        console.log("Calling products model using a service.");
    }

    async getAllProducts(filter) {
        try {
            // Aplicar filtros y paginación según el objeto `filter`
            const { limit, page, sort, query, category, availability } = filter;
            const skip = (page - 1) * limit;
            const sortOptions = {};
            if (sort === 1 || sort === -1) {
                sortOptions.price = sort;
            }
            const regexQuery = new RegExp(query, 'i');
            const regexCategory = new RegExp(category, 'i');
            const regexAvailability = new RegExp(availability, 'i');
            const totalCount = await Product.countDocuments({
                $or: [{ title: regexQuery }, { description: regexQuery }],
                category: regexCategory,
                availability: regexAvailability
            });
            const totalPages = Math.ceil(totalCount / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            const prevPage = hasPrevPage ? page - 1 : null;
            const nextPage = hasNextPage ? page + 1 : null;
            const products = await Product.find({
                $or: [{ title: regexQuery }, { description: regexQuery }],
                category: regexCategory,
                availability: regexAvailability
            })
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const response = {
                status: 'success',
                payload: products,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?page=${prevPage}` : null,
                nextLink: hasNextPage ? `/api/products?page=${nextPage}` : null
            };

            return response;
        } catch (error) {
            throw error;
        }
    }

    async saveProduct(productData) {
        try {
            const newProduct = new Product(productData);
            const savedProduct = await newProduct.save();
            return savedProduct;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, updatedProductData) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);
            return deletedProduct;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await Product.findById(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }
}

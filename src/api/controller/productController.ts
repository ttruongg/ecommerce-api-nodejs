import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { Product } from "../model/product";
import { Category } from "../model/category";


export const getAll_Product = async (request: Request, response: Response) => {
    // localhost:8000/api/v1/products?categories=, 12312346464

    let filter: any = {};
    if (typeof request.query.categories === 'string') {
        filter = { category: request.query.categories.split(',').map(category => category.trim()) };
    }
    const ProductList = await Product.find(filter).populate("category");
    if (!ProductList) {
        return response.status(404).json({ success: false });
    }
    response.status(200).send(ProductList);
};

export const getProductById = async (request: Request, response: Response) => {
    const product_id = request.params.id;
    const product = await Product.findById(product_id).populate("category");
    try {
        if (product) {
            return response.status(200).json({ success: true, product: product });
        } else {
            return response.status(404).json({ sucess: false, msg: "Product not found" });
        }
    } catch (error) {
        return response.status(400).send({ msg: error });
    }

};

export const addProduct = async (request: Request, response: Response) => {
    const category = await Category.findById(request.body.category);
    if (!category) return response.status(400).send("Invalid category");

    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send({ error: result.array() });
    const data = matchedData(request);
    const newProduct = new Product(data);

    try {
        const saveProduct = await newProduct.save();
        return response.status(200).send(saveProduct);
    } catch (error) {
        return response.status(404).send({ error: error });
    }
};

export const updateProduct = async (request: Request, response: Response) => {
    const category = await Category.findById(request.body.category);
    if (!category) return response.status(400).send("Invalid category");

    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send({ error: result.array() });
    const id = request.params.id;
    const data = matchedData(request);
    try {
        const product = await Product.findByIdAndUpdate(id, data, { new: true });
        if (product) {
            return response.status(200).send({ sucess: true, product: product });
        } else {
            return response.status(404).send({ sucess: false, msg: "product not found" });
        }
    } catch (error) {
        return response.status(400).send({ msg: error });
    }
};

export const deleteProduct = async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        return product ?
            response.status(200).send({ msg: "deleted successfully" }) :
            response.status(404).send({ msg: "product not found" });
    } catch (error) {
        return response.status(400).send({ err: error });
    }
};

export const countProduct = async (request: Request, response: Response) => {
    const productCount = await Product.countDocuments();

    if (!productCount) {
        return response.status(500).send({ success: false });
    }

    response.status(200).send({
        productCount: productCount
    });
};

export const productsFeatured = async (request: Request, response: Response) => {
    const count = request.params.count ? request.params.count : 0;
    const featuredList = await Product.find({ isFeatured: true }).limit(+count);

    if (!featuredList) return response.status(500).send({ success: false });

    response.status(200).send(featuredList);
}

import { request, Request, Response } from "express";
import { Category } from "../model/category";
import { matchedData, validationResult } from "express-validator";

export const getListCategory = async (request: Request, response: Response) => {
    const categoryList = await Category.find();

    if (!categoryList)
        response.status(400).json({ categoryList: "empty" });

    response.status(200).send(categoryList);
};

export const getCategoryById = async (request: Request, response: Response) => {
    const category_id = request.params.id;
    try {
        const category = await Category.findById(category_id);
        if (category) {
            return response.status(200).json({ sucess: true, category: category });
        } else {
            return response.status(404).json({ sucess: false, msg: "category not found!" });
        }
    } catch (error) {
        return response.status(400).json({ error: error });
    }
}

export const addCategory = async (request: Request, response: Response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send({ error: result.array() });

    const data = matchedData(request);
    const newCategory = new Category(data);

    try {
        const saveCategory = await newCategory.save();
        return response.status(201).send(saveCategory);
    } catch (error) {
        return response.status(404).send({ error: error });
    }
};

export const deleteCategory = async (request: Request, response: Response) => {
    const category_id = request.params.id;
    try {
        const category = await Category.findByIdAndDelete(category_id);
        if (category) {
            return response.status(200).json({ sucess: true, msg: "Category is deleted" });
        } else {
            return response.status(404).json({ sucess: false, msg: "category not found!" });
        }
    } catch (err) {
        return response.status(400).json({ sucess: false, error: err });
    }

};

export const updateCategory = (request: Request, response: Response) => {

}


import { Request, Response } from "express";
import { Category } from "../model/category";
import { matchedData, validationResult } from "express-validator";

export const getListCategory = async (request: Request, response: Response) => {
    const categoryList = await Category.find();

    if (!categoryList)
        response.status(400).json({ categoryList: "empty" });

    response.send(categoryList);
};

export const addCategory = async (request: Request, response: Response) => {
    const result = validationResult(request);
    if(!result.isEmpty()) return response.status(400).send({error: result.array()});
    
    const data = matchedData(request);
    const newCategory = new Category(data);

    try {
        const saveCategory = await newCategory.save();
        return response.status(201).send(saveCategory);
    } catch(error) {
        return response.status(404).send({error: error});
    }

    
}
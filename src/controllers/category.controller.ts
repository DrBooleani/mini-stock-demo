import { Request, Response } from "express";
import { CategoryService } from "../services/category/category.service";

export class CategoryController {
  private readonly categoryService = new CategoryService();

  listCategories = async(request: Request, response: Response) => {
    const categories = await this.categoryService.listCategories();
    response.status(200).json(categories);
  };

  createCategory = async(request: Request, response: Response) => {
    const { name } = request.body;
    try {
      const category = await this.categoryService.createCategory(name);
      response.status(201).json(category);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  updateCategory = async(request: Request, response: Response) => {
    try {
      const { name } = request.body;
      const category_id = request.query.category_id as string;
      const categoryEdited = await this.categoryService.updateCategory({name, category_id});
      response.status(200).json(categoryEdited);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }

  };

  deleteCategory = async(request: Request, response: Response) => {
    try {
      const category_id = request.query.category_id as string;
      await this.categoryService.deleteCategory(category_id);
      response.status(200).json("Specified category was deleted");
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  };
}
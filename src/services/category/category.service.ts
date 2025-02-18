import { AbstractCategoryService } from "./category.base";
import prismaClient from "../../prisma";
import { EditCategoryRequest } from "../../models/category/requests/edit-category.request";
import { Category } from "@prisma/client"; // Tipagem para Category, caso o modelo exista no seu banco.

export class CategoryService extends AbstractCategoryService {
  
  async listCategories(): Promise<any[]> {
    return await prismaClient.category.findMany({
      select: {
        id: true,
        name: true
      }
    });
  }

  async createCategory(name: string): Promise<any> {
    this.validateName(name);
    await this.categoryAlreadyExists(name);

    return await prismaClient.category.create({
      data: { name },
      select: { id: true, name: true }
    });
  }

  async updateCategory({ name, category_id }: EditCategoryRequest): Promise<Category> {
    if (!category_id) {
      throw new Error("Category ID is required");
    }

    this.validateName(name);

    const category = await prismaClient.category.findUnique({
      where: { id: category_id }
    });

    if (!category) {
      throw new Error("Category not found");
    }

    await this.categoryAlreadyExists(name);

    return await prismaClient.category.update({
      where: { id: category_id },
      data: { name }
    });
  }

  async deleteCategory(category_id: string): Promise<Category> {
    if (!category_id) {
      throw new Error("Category ID is required");
    }

    const category = await prismaClient.category.findUnique({
      where: { id: category_id }
    });

    if (category === null) {
      throw new Error("Category not found");
    }

    return await prismaClient.category.delete({
      where: { id: category_id }
    });
  }

  private validateName(name: string): void {
    if (!name || name.trim() === "") {
      throw new Error("Invalid name");
    }
  }

  private async categoryAlreadyExists(name: string): Promise<void> {
    const category = await prismaClient.category.findFirst({
      where: { name },
      select: { name: true }
    });

    if (category) {
      throw new Error("This category already exists");
    }
  }
}

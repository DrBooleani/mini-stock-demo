import { CreateProductRequest } from "../../models/product/requests/create-product.request";
import { EditProductRequest } from "../../models/product/requests/edit-product.request";
import { AbstractProductService } from "./product.base";

import prismaClient from "../../prisma";
import { SaleProductRequest } from "../../models/product/requests/sale-product.request";

export class ProductService extends AbstractProductService {
  async listProducts(): Promise<any[]> {
    const products = await prismaClient.product.findMany({
      select: {
        id: true,
        name: true,
        amount: true,
        description: true,
        price: true,
        category: true
      },
      orderBy: {
        created_at: "desc"
      },
    });

    return products;
  }
  
  async createProduct({ name, price, description, amount, category_id }: CreateProductRequest): Promise<any> {
    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        category_id,
        amount: +amount,
      },
    });

    return product;
  }

  async editProduct({ name, amount, description, price, product_id, category_id }: EditProductRequest): Promise<any> {
    const product = await prismaClient.product.findFirst({
      where: { id: product_id }
    });

    if (!product) {
      throw new Error("Product does not exist!");
    }

    const productEdited = await prismaClient.product.update({
      where: { id: product_id },
      data: {
        name,
        price,
        description,
        category_id,
        amount: +amount,
      },
    });

    return productEdited;
  }

  async deleteProduct(product_id: string): Promise<any> {
    if (!product_id) {
      throw new Error("Product ID was not provided!");
    }

    const product = await prismaClient.product.delete({
      where: { id: product_id }
    });

    return product;

  }
  async saleProduct({ product_id, amount }: SaleProductRequest): Promise<any> {
    const hasNotProductIdAndAmount = !product_id || !amount;
    if (hasNotProductIdAndAmount) {
      throw new Error("Input data is missing!");
    }

    const queryProduct = await prismaClient.product.findFirst({
      where: { id: product_id }
    });
    
    if (queryProduct?.amount >= amount && amount > 0) {
      const newAmount = queryProduct.amount - amount;
      const updatedProduct = await prismaClient.product.update({
        where: { id: product_id },
        data: { amount: newAmount },
        select: {
          id: true,
          name: true,
          amount: true
        }
      });

      return updatedProduct;
    } else {
      throw new Error("Sale could not be completed!")
    }
  }
  
}
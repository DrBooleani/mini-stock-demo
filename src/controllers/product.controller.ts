import { Request, Response } from "express";
import { ProductService } from "../services/product/product.service";

export class ProductController {
  private readonly productService = new ProductService();

  listProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productService.listProducts();
      res.status(200).json(products);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  createProduct = async(req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  editProduct = async(req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productService.editProduct(req.body);
      res.status(200).json(product);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  deleteProduct = async(req: Request, res: Response): Promise<void> => {
    try {
      const product_id = req.query.product_id as string;
      await this.productService.deleteProduct(product_id);
      res.sendStatus(204);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  saleProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const saleResult = await this.productService.saleProduct(req.body);
      res.status(200).json(saleResult);
    } catch (error) {
      this.handleError(res, error);
    }
  }
  
  private handleError(res: Response, error: any) {
    res.status(400).json({ error: error.message });
  }
}
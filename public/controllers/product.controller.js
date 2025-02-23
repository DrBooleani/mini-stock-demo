"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product/product.service");
class ProductController {
    constructor() {
        this.productService = new product_service_1.ProductService();
        this.listProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.listProducts();
                res.status(200).json(products);
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productService.createProduct(req.body);
                res.status(201).json(product);
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.editProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productService.editProduct(req.body);
                res.status(200).json(product);
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.query.product_id;
                yield this.productService.deleteProduct(product_id);
                res.sendStatus(204);
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
        this.saleProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const saleResult = yield this.productService.saleProduct(req.body);
                res.status(200).json(saleResult);
            }
            catch (error) {
                this.handleError(res, error);
            }
        });
    }
    handleError(res, error) {
        res.status(400).json({ error: error.message });
    }
}
exports.ProductController = ProductController;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_base_1 = require("./product.base");
const prisma_1 = __importDefault(require("../../prisma"));
class ProductService extends product_base_1.AbstractProductService {
    listProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma_1.default.product.findMany({
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
        });
    }
    createProduct(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, price, description, amount, category_id }) {
            const product = yield prisma_1.default.product.create({
                data: {
                    name,
                    price,
                    description,
                    category_id,
                    amount: +amount,
                },
            });
            return product;
        });
    }
    editProduct(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, amount, description, price, product_id, category_id }) {
            const product = yield prisma_1.default.product.findFirst({
                where: { id: product_id }
            });
            if (!product) {
                throw new Error("Product does not exist!");
            }
            const productEdited = yield prisma_1.default.product.update({
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
        });
    }
    deleteProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!product_id) {
                throw new Error("Product ID was not provided!");
            }
            const product = yield prisma_1.default.product.delete({
                where: { id: product_id }
            });
            return product;
        });
    }
    saleProduct(_a) {
        return __awaiter(this, arguments, void 0, function* ({ product_id, amount }) {
            const hasNotProductIdAndAmount = !product_id || !amount;
            if (hasNotProductIdAndAmount) {
                throw new Error("Input data is missing!");
            }
            const queryProduct = yield prisma_1.default.product.findFirst({
                where: { id: product_id }
            });
            if ((queryProduct === null || queryProduct === void 0 ? void 0 : queryProduct.amount) >= amount && amount > 0) {
                const newAmount = queryProduct.amount - amount;
                const updatedProduct = yield prisma_1.default.product.update({
                    where: { id: product_id },
                    data: { amount: newAmount },
                    select: {
                        id: true,
                        name: true,
                        amount: true
                    }
                });
                return updatedProduct;
            }
            else {
                throw new Error("Sale could not be completed!");
            }
        });
    }
}
exports.ProductService = ProductService;

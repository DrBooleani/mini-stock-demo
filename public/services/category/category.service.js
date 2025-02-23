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
exports.CategoryService = void 0;
const category_base_1 = require("./category.base");
const prisma_1 = __importDefault(require("../../prisma"));
class CategoryService extends category_base_1.AbstractCategoryService {
    listCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.category.findMany({
                select: {
                    id: true,
                    name: true
                }
            });
        });
    }
    createCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateName(name);
            yield this.categoryAlreadyExists(name);
            return yield prisma_1.default.category.create({
                data: { name },
                select: { id: true, name: true }
            });
        });
    }
    updateCategory(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, category_id }) {
            if (!category_id) {
                throw new Error("Category ID is required");
            }
            this.validateName(name);
            const category = yield prisma_1.default.category.findUnique({
                where: { id: category_id }
            });
            if (!category) {
                throw new Error("Category not found");
            }
            yield this.categoryAlreadyExists(name);
            return yield prisma_1.default.category.update({
                where: { id: category_id },
                data: { name }
            });
        });
    }
    deleteCategory(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!category_id) {
                throw new Error("Category ID is required");
            }
            const category = yield prisma_1.default.category.findUnique({
                where: { id: category_id }
            });
            if (category === null) {
                throw new Error("Category not found");
            }
            return yield prisma_1.default.category.delete({
                where: { id: category_id }
            });
        });
    }
    validateName(name) {
        if (!name || name.trim() === "") {
            throw new Error("Invalid name");
        }
    }
    categoryAlreadyExists(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield prisma_1.default.category.findFirst({
                where: { name },
                select: { name: true }
            });
            if (category) {
                throw new Error("This category already exists");
            }
        });
    }
}
exports.CategoryService = CategoryService;

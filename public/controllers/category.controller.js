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
exports.CategoryController = void 0;
const category_service_1 = require("../services/category/category.service");
class CategoryController {
    constructor() {
        this.categoryService = new category_service_1.CategoryService();
        this.listCategories = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryService.listCategories();
            response.status(200).json(categories);
        });
        this.createCategory = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { name } = request.body;
            try {
                const category = yield this.categoryService.createCategory(name);
                response.status(201).json(category);
            }
            catch (error) {
                response.status(400).json({ error: error.message });
            }
        });
        this.updateCategory = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = request.body;
                const category_id = request.query.category_id;
                const categoryEdited = yield this.categoryService.updateCategory({ name, category_id });
                response.status(200).json(categoryEdited);
            }
            catch (error) {
                response.status(400).json({ error: error.message });
            }
        });
        this.deleteCategory = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category_id = request.query.category_id;
                yield this.categoryService.deleteCategory(category_id);
                response.status(200).json("Specified category was deleted");
            }
            catch (error) {
                response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CategoryController = CategoryController;

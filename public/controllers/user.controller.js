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
exports.UserController = void 0;
const user_service_1 = require("../services/user/user.service");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.createUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = request.body;
            try {
                const user = yield this.userService.create({ name, email, password });
                response.status(201).json(user);
            }
            catch (error) {
                this.handleError(response, error);
            }
        });
        this.authUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            try {
                const auth = yield this.userService.auth({ email, password });
                response.status(200).json(auth);
            }
            catch (error) {
                this.handleError(response, error);
            }
        });
    }
    handleError(response, error) {
        response.status(400).json({ error: error.message });
    }
}
exports.UserController = UserController;

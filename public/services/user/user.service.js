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
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const user_base_1 = require("./user.base");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserService extends user_base_1.BaseUserService {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            yield this.validateEmail(email);
            const userAlreadyExists = yield this.userExists(email);
            if (userAlreadyExists) {
                throw new Error("E-mail already exists");
            }
            const passwordHash = yield this.hashPassword(password);
            const user = yield prisma_1.default.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            return user;
        });
    }
    auth(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            yield this.validateEmail(email);
            if (!password) {
                throw new Error("Password needs to be provided!");
            }
            const user = yield this.userExists(email);
            if (!user) {
                throw new Error("Wrong username/password");
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new Error("Wrong username/password");
            }
            const token = this.generateToken(user);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            };
        });
    }
    generateToken(user) {
        return (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET || 'NAOTEMCHAVESECRETA', {
            subject: user.id,
            expiresIn: '1h'
        });
    }
}
exports.UserService = UserService;

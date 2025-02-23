"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function isAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken || typeof authToken !== 'string') {
        response.sendStatus(401);
        return;
    }
    const token = authToken.split(" ")[1];
    if (!token) {
        response.sendStatus(401);
        return;
    }
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || 'NAOTEMCHAVESECRETA');
        request.user_id = sub;
        next();
    }
    catch (error) {
        response.sendStatus(401);
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeController = void 0;
class WelcomeController {
    handle(req, res) {
        res.json({ message: "Welcome to MiniStock Server" });
    }
}
exports.WelcomeController = WelcomeController;

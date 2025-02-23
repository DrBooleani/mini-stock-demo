"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const FRONTEND_ORIGINS = process.env.FRONTEND_ORIGINS ? process.env.FRONTEND_ORIGINS.split(',') : ["*"];
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: FRONTEND_ORIGINS,
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
}));
app.use("/", routes_1.default);
app.listen(port, () => {
    console.log(`[Mini-Stock] Server is running at port ${port}`);
});

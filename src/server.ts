import express from "express";
import routes from './routes';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const FRONTEND_ORIGINS = process.env.FRONTEND_ORIGINS ? process.env.FRONTEND_ORIGINS.split(',') : ["*"];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: FRONTEND_ORIGINS,
  methods: "GET, PUT, POST, DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
}));

app.use("/", routes);

app.listen(port, () => {
  console.log(`[Mini-Stock] Server is running at port ${port}`);
});
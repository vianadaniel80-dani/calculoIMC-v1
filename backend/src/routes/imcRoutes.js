import express from "express";
import ImcController from "../controllers/imcController.js";

const routes = express.Router();

routes.post("/calculoIMC", ImcController.calculcarIMC);

export default routes;

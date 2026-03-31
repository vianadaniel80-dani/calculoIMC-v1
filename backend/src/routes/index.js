import express from "express";
import imcRoutes from "./imcRoutes.js";

const routes = (app) => {
  app.route("/").get((req, resp) => {
    resp.status(200).send("API IMC v1.0");
  });

  app.use(express.json(), imcRoutes);
};

export default routes;

import express from "express";
import routes from "./routes/index.js";
import errorRotas404 from "./middleware/erro404.js";
import manipuladorError from "./middleware/manipuladorErros.js";
import cors from "cors";

const app = express();

app.use(cors());
routes(app);
app.use(errorRotas404);
app.use(manipuladorError);

export default app;

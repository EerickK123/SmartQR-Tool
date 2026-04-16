import express from "express";
import cors from "cors";
import { DB_schema } from "./db/schema/db-schema";
import router from "./router";


export const app = async (port?: number) => {
  const App = express();
  App.use(cors());
  App.use(express.json());

  await DB_schema();

  App.get("/", (_req, res) => {
    res.send("backend en linea");
  });

  App.use("/api", router);

  App.listen(port, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}/`);
  });

  return App;
};

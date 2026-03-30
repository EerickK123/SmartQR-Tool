import express from "express";
import cors from "cors";
import { DB_schema } from "./db/schema/db-schema"; // modificar para que tenga un usuario root cuando se cree la db
import router from "./router";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


const app = async (port?: number) => {
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
export default app;

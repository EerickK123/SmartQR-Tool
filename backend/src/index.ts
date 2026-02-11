import express from "express";
import { DB_schema } from "./db/db-schema";

const app = express();
app.use(express.json());

DB_schema();

app.get("/", (req, res) => {
  res.send("SmartQR backend funcionando");
});

app.listen(Number(process.env.PORT), () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
});

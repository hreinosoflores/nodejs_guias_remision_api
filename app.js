import express, { urlencoded, json } from "express";
import morgan from "morgan";
import guiaRemisionRouter from "./src/routes/guia_remision.js";
import destinatariosRouter from "./src/routes/destinatarios.js";

const app = express();

// settings
app.set("port", 3000);

// middlewares
app.use(morgan("dev"));
app.use(urlencoded({ extended: false }));
app.use(json());

// routes
app.use("/destinatarios", destinatariosRouter);
app.use("/guiasremision", guiaRemisionRouter);

app.listen(app.get("port"), () => {
  console.log(`SERVER UP ON PORT ${app.get("port")}!!`);
});

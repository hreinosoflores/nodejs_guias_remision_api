import { set, connect } from "mongoose";
set("strictQuery", true);

export default function () {
  connect("mongodb://localhost:27017/mongo3_curso")
    .then(() => console.log("CONECTADO A MONGO DB"))
    .catch((e) => console.log("El error de conexion es: ", e));
}

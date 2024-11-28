import { set, Schema, model } from "mongoose";
import { schemas, collNames } from "./global.js";
import db_conn from "./db_conn.js";

set("strictQuery", true);

export default function (obj, name) {
  db_conn();
  var schema = Schema(schemas[obj], schemas.options(collNames[name]));
  return model(collNames[name], schema);
}

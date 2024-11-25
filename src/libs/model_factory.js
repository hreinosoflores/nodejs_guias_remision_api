const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const global = require("./global.js");

module.exports = function (obj, name) {
    require("./db_conn.js")();
    var schema = mongoose.Schema(
        global.schemas[obj],
        global.schemas.options(global.collNames[name])
    );
    return mongoose.model(global.collNames[name], schema);
};

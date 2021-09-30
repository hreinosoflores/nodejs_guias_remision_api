const mongoose = require("mongoose");

module.exports = function () {
    mongoose.connect("mongodb://localhost/mongo3_curso")
        .then(
            () => console.log("CONECTADO A MONGO DB")
        )
        .catch(
            e => console.log("El error de conexion es: ", e)
        );
};


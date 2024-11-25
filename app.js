const express = require("express");
const morgan = require("morgan");

const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/destinatarios", require("./src/routes/destinatarios"));
app.use("/guiasremision", require("./src/routes/guia_remision"));

app.listen(
    app.get("port"),
    () => {
        console.log(`SERVER UP ON PORT ${app.get("port")}!!`);
    }
);

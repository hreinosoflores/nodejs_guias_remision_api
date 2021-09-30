const express = require("express");
const router = express.Router();

const
    DestinatarioModel = require("../libs/model_factory.js")("destinatarioObj", "destinatarios");

router.get("/", (req, res) => {
    DestinatarioModel.find()
        .then(
            destinatarios => res.json(destinatarios)
        )
        .catch(
            e => console.log("Error !!", e)
        );
});

router.post("/add", (req, res) => {
    let body = req.body;
    DestinatarioModel.find().sort({ "nroDest": -1 }).limit(1)
        .then(
            destinatarios => {
                body.nroDest = destinatarios[0].nroDest + 1;
                DestinatarioModel.create(body)
                    .then(
                        destinatario => res.json(destinatario)
                    )
                    .catch(
                        e => console.log("Error !!", e)
                    );
            }
        )
        .catch(
            e => console.log("Error !!", e)
        );
});

router.patch("/update/:nroDest", (req, res) => {
    DestinatarioModel.updateOne({ "nroDest": req.params.nroDest }, req.body)
        .then(
            response => res.json(response)
        )
        .catch(
            e => console.log("Error !!", e)
        );
});

router.delete("/delete/:nroDest", (req, res) => {
    DestinatarioModel.deleteOne({ "nroDest": req.params.nroDest })
        .then(
            response => res.json(response)
        )
        .catch(
            e => console.log("Error !!", e)
        );
});

module.exports = router;



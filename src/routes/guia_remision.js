const express = require("express");
const router = express.Router();

const GuiaModel = require("../libs/model_factory.js")("guiaObj", "guias");

// Generar nueva Guía de Remisión
router.post("/add", (req, res) => {
    let body = req.body;
    GuiaModel.find().sort({ "nroGuiaRem": -1 }).limit(1)
        .then(
            guias => {
                body.nroGuiaRem = guias[0].nroGuiaRem + 1;
                if (body.detalles.length == 0)
                    res.send("Guía debe tener por lo menos un detalle en su lista.");
                else
                    GuiaModel.create(body)
                        .then(
                            guia => res.json(guia)
                        )
                        .catch(
                            e => console.log("Error !!", e)
                        );
            }
        )
        .catch(e => console.log("Error !!", e));
});

// Guía firmada
router.patch("/firmar/:nroGuiaRem", (req, res) => {
    GuiaModel.updateOne({ "nroGuiaRem": req.params.nroGuiaRem }, { "firmado": true })
        .then(response => res.json(response))
        .catch(e => console.log("Error !!", e));
});

// Conformidad Cliente
router.patch("/conforme/:nroGuiaRem", (req, res) => {
    GuiaModel.updateOne({ "nroGuiaRem": req.params.nroGuiaRem }, { "clienteConforme": true })
        .then(response => res.json(response))
        .catch(e => console.log("Error !!", e));
});

// Borrar Guía
router.delete("/delete/:nroGuiaRem", (req, res) => {
    GuiaModel.deleteOne({ "nroGuiaRem": req.params.nroGuiaRem })
        .then(response => res.json(response))
        .catch(e => console.log("Error !!", e));
});

// router.get("/:nroGuiaRem", (req, res) => {
//     // GuiaModel.findOne({ "nroGuiaRem": req.params.nroGuiaRem })
//     //     .then(
//     //         guia => res.json(guia)
//     //     )
//     //     .catch(
//     //         e => console.log("Error !!", e)
//     //     );

//     GuiaModel.aggregate(
//         [
//             {
//                 $match: {
//                     "nroGuiaRem": 1
//                 }
//             }
//         ]
//     ).exec()
//         .then(
//             guia => res.json(guia)
//         )
//         .catch(
//             e => console.log("Error !!", e)
//         );
// });


module.exports = router;



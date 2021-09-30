const express = require("express");
const router = express.Router();

const
    GuiaModel = require("../libs/model_factory.js")("guiaObj", "guias");

// Borrar Guía
router.delete("/delete/:nroGuiaRem", (req, res) => {
    GuiaModel.deleteOne({ "nroDest": req.params.nroGuiaRem })
        .then(
            response => res.json(response)
        )
        .catch(
            e => console.log("Error !!", e)
        );
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

// router.post("/add", (req, res) => {
//     let body = req.body;
//     DestinatarioModel.find().sort({ "nroDest": -1 }).limit(1)
//         .then(
//             destinatarios => {
//                 body.nroDest = destinatarios[0].nroDest + 1;
//                 DestinatarioModel.create(body)
//                     .then(
//                         destinatario => res.json(destinatario)
//                     )
//                     .catch(
//                         e => console.log("Error !!", e)
//                     );
//             }
//         )
//         .catch(
//             e => console.log("Error !!", e)
//         );
// });


module.exports = router;



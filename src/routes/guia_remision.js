const express = require("express");
const router = express.Router();
const global = require("../libs/global.js");
const mongoose = require("mongoose");

const GuiaModel = require("../libs/model_factory.js")("guiaObj", "guias");

router.get("/get/:nroGuiaRem", (req, res) => {

    const match = () => ({
        $match: {
            nroGuiaRem: mongoose.Types.Decimal128(req.params.nroGuiaRem)
        }
    });

    const lookup = (from, localField, foreignField, as) => ({
        $lookup: {
            from: from,
            localField: localField,
            foreignField: foreignField,
            as: as
        }
    });

    const project = () => ({
        $project:
        {
            nroGuiaRem: 1,
            fecEmision: 1,
            fecTraslado: 1,
            dirPartida: 1,
            dirLlegada: 1,
            _Destinatario: 1,
            _Vehiculo: 1,
            _Conductor: 1,
            _Comprobante: 1,
            _Motivo: 1,
            _Transportista: 1,
            detalles: 1,
            _Productos: 1,
            firmado: {
                $cond: [{ $eq: ["$firmado", true] }, "Sí", "No"]
            },
            clienteConforme: {
                $cond: [{ $eq: ["$clienteConforme", true] }, "Sí", "No"]
            }
        }
    });

    const unset = () => ({
        $unset: [
            "_id",
            "_Destinatario._id",
            "_Destinatario.nroDest",
            "_Vehiculo._id",
            "_Vehiculo.nroVehi",
            "_Conductor._id",
            "_Conductor.nroVehi",
            "_Comprobante._id",
            "_Motivo._id",
            "_Motivo.nroMotivo",
            "_Transportista._id",
            "_Transportista.nroTransp"
        ]
    });


    GuiaModel.aggregate(
        [
            match(),
            lookup(global.collNames.destinatarios, "destinatario", "nroDest", "_Destinatario"),
            lookup(global.collNames.vehiculos, "vehiculo", "nroVehi", "_Vehiculo"),
            lookup(global.collNames.conductores, "conductor", "nroCondu", "_Conductor"),
            lookup(global.collNames.comprobantes, "comprobante", "nroComprob", "_Comprobante"),
            lookup(global.collNames.motivos, "motivo", "nroMotivo", "_Motivo"),
            lookup(global.collNames.transportistas, "transportista", "nroTransp", "_Transportista"),
            lookup(global.collNames.productos, "detalles.nroProd", "nroProd", "_Productos"),
            project(),
            unset()
        ]
    )
        .then(
            // recibir array y trabajar con el elemento
            aggrOutput => {
                const guia = {
                    "nroGuiaRem": aggrOutput[0].nroGuiaRem,
                    "fecEmision": aggrOutput[0].fecEmision,
                    "fecTraslado": aggrOutput[0].fecTraslado,
                    "dirPartida": aggrOutput[0].dirPartida,
                    "dirLlegada": aggrOutput[0].dirLlegada,
                    "destinatario": aggrOutput[0]._Destinatario[0],
                    "vehiculo": aggrOutput[0]._Vehiculo[0],
                    "conductor": aggrOutput[0]._Conductor[0],
                    "comprobante": aggrOutput[0]._Comprobante[0],
                    "motivo": aggrOutput[0]._Motivo[0],
                    "transportista": aggrOutput[0]._Transportista[0],
                    "firmado": aggrOutput[0].firmado,
                    "clienteConforme": aggrOutput[0].clienteConforme,
                    "detalles": aggrOutput[0].detalles.map(
                        detalle => ({
                            cantidad: detalle.cantPedida,
                            descripcion: aggrOutput[0]._Productos.find(prod => prod.nroProd === detalle.nroProd).descr,
                            pesoTotal: detalle.pesoTotal
                        })
                    )
                };
                res.json(guia);
            }
        )
        .catch(
            e => console.log("Error !!", e)
        );
});




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


module.exports = router;



// Collection names  
module.exports.collNames = {
    "destinatarios": "destinatarios",
    "vehiculos": "vehiculos",
    "conductores": "conductores",
    "comprobantes": "comprobantes",
    "motivos": "motivos",
    "transportistas": "transportistas",
    "productos": "productos",
    "guias": "guias_remision"
};

// Schemas
module.exports.schemas = {
    "options": function (collName) {
        return {
            "versionKey": false,
            "collection": collName
        };
    },
    "destinatarioObj": {
        "nroDest": Number,
        "nombres": String,
        "apellidos": String,
        "razonSocial": String,
        "ruc": String,
        "tipoDoc": String,
        "nroDocIdent": String
    },
    "vehiculoObj": {
        "nroVehi": Number,
        "marca": String,
        "placa": String,
        "nroCertInscMTC": String
    },
    "conductorObj": {
        "nroCondu": Number,
        "nroLicCondu": String
    },
    "comprobanteObj": {
        "nroComprob": Number,
        "tipoComprob": String
    },
    "motivoObj": {
        "nroMotivo": Number,
        "descr": String
    },
    "transportistaObj": {
        "nroTransp": Number,
        "nombres": String,
        "apellidos": String,
        "razonSocial": String,
        "ruc": String
    },
    "productoObj": {
        "nroProd": Number,
        "descr": String
    },
    "guiaObj": {
        "nroGuiaRem": Number,
        "fecEmision": Date,
        "fecTraslado": Date,
        "dirPartida": String,
        "dirLlegada": String,
        "destinatario": Number,
        "vehiculo": Number,
        "conductor": Number,
        "comprobante": Number,
        "motivo": Number,
        "transportista": Number,
        "firmado": Boolean,
        "clienteConforme": Boolean,
        "detalles": [
            {
                "nroProd": Number,
                "cantPedida": Number,
                "pesoTotal": Number
            }
        ]
    }
};


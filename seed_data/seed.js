const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo3_curso")
    .then(
        () => console.log("CONECTADO A MONGO DB")
    )
    .catch(
        e => console.log("El error de conexion es: ", e)
    );

// Collection names   
const
    destinatario = "destinatario",
    vehiculo = "vehiculo",
    conductore = "conductore",
    comprobante = "comprobante",
    motivo = "motivo",
    transportista = "transportista",
    producto = "producto",
    guia = "guia";


// Schemas
const
    vKey = {
        "versionKey": false
    },
    destinatarioObj = {
        "nroDest": Number,
        "nombres": String,
        "apellidos": String,
        "razonSocial": String,
        "ruc": String,
        "tipoDoc": String,
        "nroDocIdent": String
    },
    vehiculoObj = {
        "nroVehi": Number,
        "marca": String,
        "placa": String,
        "nroCertInscMTC": String
    },
    conductorObj = {
        "nroCondu": Number,
        "nroLicCondu": String
    },
    comprobanteObj = {
        "nroComprob": Number,
        "tipoComprob": String
    },
    motivoObj = {
        "nroMotivo": Number,
        "descr": String
    },
    transportistaObj = {
        "nroTransp": Number,
        "nombres": String,
        "apellidos": String,
        "razonSocial": String,
        "ruc": String
    },
    productoObj = {
        "nroProd": Number,
        "descr": String
    },
    guiaObj = {
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
    };


const
    destinatariosSchema = mongoose.Schema(destinatarioObj, vKey),
    vehiculosSchema = mongoose.Schema(vehiculoObj, vKey),
    conductoresSchema = mongoose.Schema(conductorObj, vKey),
    comprobantesSchema = mongoose.Schema(comprobanteObj, vKey),
    motivosSchema = mongoose.Schema(motivoObj, vKey),
    transportistasSchema = mongoose.Schema(transportistaObj, vKey),
    productosSchema = mongoose.Schema(productoObj, vKey),
    guiasSchema = mongoose.Schema(guiaObj, vKey);


// Models
const
    DestinatarioModel = mongoose.model(destinatario, destinatariosSchema),
    VehiculoModel = mongoose.model(vehiculo, vehiculosSchema),
    ConductorModel = mongoose.model(conductore, conductoresSchema),
    ComprobanteModel = mongoose.model(comprobante, comprobantesSchema),
    MotivoModel = mongoose.model(motivo, motivosSchema),
    TransportistaModel = mongoose.model(transportista, transportistasSchema),
    ProductoModel = mongoose.model(producto, productosSchema),
    GuiaModel = mongoose.model(guia, guiasSchema);

// Insert Functions
async function insert(model, collection) {
    // Drop Collection if exists
    await model.collection.drop()
        .then(function (res) { console.log(`Colección '${collection}s' borrada: `, res); })
        .catch(function (error) { console.log("Error: ", error); });
    // Create Collection and insert data from json file
    await model.insertMany(require(`./${collection}s.json`))
        .then(function (res) { console.log(`Los siguientes datos fueron insertados en '${collection}s'`, res); })
        .catch(function (error) { console.log("Error: ", error); });
}

insert(DestinatarioModel, destinatario);
insert(VehiculoModel, vehiculo);
insert(ConductorModel, conductore);
insert(ComprobanteModel, comprobante);
insert(MotivoModel, motivo);
insert(TransportistaModel, transportista);
insert(ProductoModel, producto);
insert(GuiaModel, guia);










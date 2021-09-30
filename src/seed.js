// Models
const
    DestinatarioModel = require("./libs/model_factory.js")("destinatarioObj", "destinatarios"),
    VehiculoModel = require("./libs/model_factory.js")("vehiculoObj", "vehiculos"),
    ConductorModel = require("./libs/model_factory.js")("conductorObj", "conductores"),
    ComprobanteModel = require("./libs/model_factory.js")("comprobanteObj", "comprobantes"),
    MotivoModel = require("./libs/model_factory.js")("motivoObj", "motivos"),
    TransportistaModel = require("./libs/model_factory.js")("transportistaObj", "transportistas"),
    ProductoModel = require("./libs/model_factory.js")("productoObj", "productos"),
    GuiaModel = require("./libs/model_factory.js")("guiaObj", "guias");

// Insert Functions
async function insert(model) {
    let name = model.collection.collectionName;
    // Drop Collection if exists
    await model.collection.drop()
        .then(function (res) { console.log(`Colección '${name}' borrada: `, res); })
        .catch(function (error) { console.log("Error: ", error); });
    // Create Collection and insert data from json file
    await model.insertMany(require(`./seed_data/${name}.json`))
        .then(function (res) { console.log(`Los siguientes datos fueron insertados en '${name}'`, res); })
        .catch(function (error) { console.log("Error: ", error); });
}

insert(DestinatarioModel);
insert(VehiculoModel);
insert(ConductorModel);
insert(ComprobanteModel);
insert(MotivoModel);
insert(TransportistaModel);
insert(ProductoModel);
insert(GuiaModel);










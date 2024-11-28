import modelFactory from "./src/libs/model_factory.js";

// Models
const DestinatarioModel = modelFactory("destinatarioObj", "destinatarios"),
  VehiculoModel = modelFactory("vehiculoObj", "vehiculos"),
  ConductorModel = modelFactory("conductorObj", "conductores"),
  ComprobanteModel = modelFactory("comprobanteObj", "comprobantes"),
  MotivoModel = modelFactory("motivoObj", "motivos"),
  TransportistaModel = modelFactory("transportistaObj", "transportistas"),
  ProductoModel = modelFactory("productoObj", "productos"),
  GuiaModel = modelFactory("guiaObj", "guias");

// Insert Functions
async function insert(model) {
  let name = model.collection.collectionName;
  // Drop Collection if exists
  await model.collection
    .drop()
    .then(function (res) {
      console.log(`Colección '${name}' borrada: `, res);
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });

  // Create Collection and insert data from json file
  const data = await import(`./src/seed_data/${name}.json`, {
    with: { type: "json" },
  });

  await model
    .insertMany(data.default)
    .then(function (res) {
      console.log(`Los siguientes datos fueron insertados en '${name}'`, res);
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
}

insert(DestinatarioModel);
insert(VehiculoModel);
insert(ConductorModel);
insert(ComprobanteModel);
insert(MotivoModel);
insert(TransportistaModel);
insert(ProductoModel);
insert(GuiaModel);

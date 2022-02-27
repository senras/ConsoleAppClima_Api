const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
const axios = require("axios").default;

const main = async () => {
  let opt;
  const busquedas = new Busquedas();
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const lugar = await leerInput("Ciudad: ");
        //     //Buscar ciudad
        await busquedas.ciudad(lugar);
        //     //Buscar los lugares
        //     //Seleccionar el lugar
        //     // Clima
        //     // Mostrar resultados
        console.log("\nInformacion de la ciudad\n".green);
        console.log("Ciudad:");
        console.log("Lat:");
        console.log("Lng:");
        console.log("Temperatura:");
        break;
      case 2:
        //Historial
        break;
      case 0:
        break;
      default:
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();

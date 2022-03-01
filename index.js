require('dotenv').config();
const {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

// console.log(process.env.MAPBOX_KEY);

const main = async () => {
  let opt;
  const busquedas = new Busquedas();
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Buscar ciudad
        const lugar = await leerInput('Ciudad: ');
        //Buscar los lugares
        const lugares = await busquedas.ciudad(lugar);
        //Seleccionar el lugar
        const idSeleccionado = await listarLugares(lugares);
        console.log({ idSeleccionado });
        // Clima
        const lugarSeleccionado = lugares.find(
          (lugar) => lugar.id === idSeleccionado
        );
        // Mostrar resultados
        const { nombre, lat, lng, id } = lugarSeleccionado;
        const clima = await busquedas.climaLugar(id);
        console.log(clima);
        // console.log('\nInformacion de la ciudad\n'.green);
        // console.log('Ciudad: ', nombre);
        // console.log('Lat: ', lat);
        // console.log('Lng: ', lng);
        // console.log('Temperatura:');
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

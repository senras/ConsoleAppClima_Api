require('dotenv').config();
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require('./helpers/inquirer');

const Busquedas = require('./models/busquedas');

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Ingresar ciudad
        const lugar = await leerInput('Ciudad: ');

        //Buscar los lugares
        const lugares = await busquedas.ciudad(lugar);

        //Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === '0') continue;

        const lugarSel = lugares.find((l) => l.id === id);

        //Guardar DB
        busquedas.agregarHistorial(lugarSel.nombre);

        // Clima
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        // Mostrar resultados
        console.clear;
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad: ', lugarSel.nombre.green);
        console.log('Latitud: ', lugarSel.lat);
        console.log('Longitud: ', lugarSel.lng);
        console.log('Temperatura:', clima.temp);
        console.log('Minima:', clima.min);
        console.log('Maxima:', clima.max);
        console.log('Descripcion', clima.desc.green);

        break;

      case 2:
        //Historial
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();

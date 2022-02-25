const { inquirerMenu, pausa } = require('./helpers/inquirer');

const main = async () => {
  let opt;
  do {
    opt = await inquirerMenu();
    if (opt !== 0) await pausa();
    // switch (opt) {
    //   case 1:
    //     //Buscar ciudad
    //     break;
    //   case 2:
    //     //Historial
    //     break;
    //   case 0:
    //     break;
    //   default:
    //     break;
    // }
  } while (opt !== 0);
};

main();

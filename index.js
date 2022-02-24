const { leerInput } = require('./helpers/inquirer');

console.log('Hola mundo');

const main = async () => {
  const texto = await leerInput('Hola: ');
  console.log(texto);
};

main();

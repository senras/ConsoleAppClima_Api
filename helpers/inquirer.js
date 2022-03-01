const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${'2.'.green} Historial`,
      },
      {
        value: 0,
        name: `${'0.'.green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('======================='.green);
  console.log(' Seleccione una opcion '.green);
  console.log('=======================\n'.green);
  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  const ENTER = [
    {
      type: 'input',
      name: 'enter',
      message: `\n Presione ${'ENTER'.green} para continuar \n`,
      validate: function (input) {
        if (input === '\n' && input === '\r') {
          return `\n Presione ${'ENTER'.green} para continuar \n`;
        }

        return true;
      },
    },
  ];
  console.log('\n');
  await inquirer.prompt(ENTER);
};

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message: message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    // El i es el indice de una tarea en el arreglo ( 0 el primero, por eso se le suma + 1 )
    const idx = `${i + 1}`;
    return {
      value: lugar.id,
      name: `${(idx + '.').green} ${lugar.nombre}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar',
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione lugar: ',
      choices: choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmarBorrado = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'confirmation',
      message,
    },
  ];

  const { confirmation } = await inquirer.prompt(question);
  return confirmation;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`;
    return {
      value: tarea.id,
      name: `${(idx + '.').green} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false, // Pone  true el completadoEn si marco la tarea
    };
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmarBorrado,
  mostrarListadoChecklist,
};

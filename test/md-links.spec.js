// const mdLinks = require ('../mdLinks.js')
const index = require('../index.js');
// const { TestWatcher } = require('jest');
fakeArrayLinks = [
  {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/conditionals', 
    text: '(if-else | switch | operador ternario)',
    file: './Prueba2.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',    
    text: '(parámetros | argumentos | valor de retorno)',
    file: './Prueba2.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
    text: '(filter | map | sort | reduce)',
    file: './Prueba2.md'
  },
  {
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import',
    text: '<code>import</code>',
    file: './Prueba2.md'
  },
  {
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export',
    text: '<code>export</code>',
    file: './Prueba2.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
    text: 'Uso de callbacks.',
    file: './Prueba2.md'
  },
  {
    href: 'https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises',
    text: 'Consumo de Promesas.',
    file: './Prueba2.md'
  },
  {
    href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
    text: 'Creación de Promesas.',
    file: './Prueba2.md'
  },
  {
    href: 'https://nodejs.org/api/fs.html',
    text: 'fs',
    file: './Prueba2.md'
  },
  {
    href: 'https://nodejs.org/api/path.html',
    text: 'path',
    file: './Prueba2.md'
  },
  { href: 'https://www.npmjs.com/', text: 'npm', file: './Prueba2.md' },
  {
    href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
    text: '(CommonJS)',
    file: './Prueba2.md'
  },
  {
    href: 'https://docs.npmjs.com/files/package.json',
    text: 'Configuración de package.json.',
    file: './Prueba2.md'
  },
  {
    href: 'https://docs.npmjs.com/misc/scripts',
    text: 'Configuración de npm-scripts',
    file: './Prueba2.md'
  },
  {
    href: 'https://jestjs.io/docs/es-ES/getting-started',
    text: 'Testeo unitario.',
    file: './Prueba2.md'
  },
  {
    href: 'https://jestjs.io/docs/es-ES/asynchronous',
    text: 'Testeo asíncrono.',
    file: './Prueba2.md'
  },
  {
    href: 'https://jestjs.io/docs/es-ES/manual-cks',
    text: 'Uso de librerias de Mock.',
    file: './Prueba2.md'
  }
]


const dataMD = [
  'C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\Prueba2.md',
  'C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\README.md',
  'C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\test\\pruebatest1.md',
  'C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\test\\pruebatest2.md'
  
]

// verificar la ruta
describe(' fileExist', () => {

  test('Debería ser una función', () => {
    expect(typeof index.fileExist).toBe('function');
  });
  test('debería retornar true si es una ruta', () => {
    expect(index.fileExist('./Prueba2.md')).toBe(true);
  });
  test('debería retornar false si no existe la ruta ', () => {
    expect(index.fileExist('./mentira.js')).toBe(false);
  });
});
// verificar si es absoluta
describe('validateToabsolute', () => {

  test('Debería ser una función', () => {
    expect(typeof index.validateToabsolute).toBe('function');
  });
  test('debería retornar la ruta si es absoluta', () => {
    expect(index.validateToabsolute('C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\UsersLaboratoriaOneDriveEscritorioProyectos LaboratoriaBOG002-md-linksindex.js')).toBe('C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\UsersLaboratoriaOneDriveEscritorioProyectos LaboratoriaBOG002-md-linksindex.js')
  });
  test('debería convertir la ruta a absoluta si es relativa ', () => {
    expect(index.validateToabsolute('./Prueba2.js')).toBe('C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\Prueba2.js');
  });
});
// Obtiene la extensión del archivo
describe('getExtfile', () => {
  it('debería ser una función', () => {
    expect(typeof index.getExtfile).toBe('function');
  });

  it('debería retornar la extensión del archivo', () => {
    expect(index.getExtfile('./Prueba.txt')).toBe('.txt');
  });
});
//validando extensión de archivos md
describe('validationExtension', () => {
  it('debería ser una función', () => {
    expect(typeof index.validationExtension).toBe('function');
  });

  it('debería retornar false si no es un archivo .md', () => {
    expect(index.validationExtension('./Prueba.txt')).toBe(false);
  });
  it('debería retornar true si es un archivo .md', () => {
    expect(index.validationExtension('./Prueba2.md')).toBe(true);
  });
});
// validar el extraer todos los links
describe('getallLinks', () => {
  it('debería ser una función', () => {
    expect(typeof index.getallLinks).toBe('function');
  });

  it('debería retornar la data de los links', () => {
    expect(index.getallLinks('./Prueba2.md')).toEqual(fakeArrayLinks);
  });
 
});

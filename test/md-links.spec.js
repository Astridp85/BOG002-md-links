// const mdLinks = require ('../mdLinks.js')
const index = require ('../index.js');
// const { TestWatcher } = require('jest');


// verificar la ruta
describe(' fileExist', () => {

  test('Debería ser una función', () => {
    expect(typeof index.fileExist).toBe('function');
  });
  test('debería retornar true si es una ruta', ()=>{
   expect(index.fileExist('./Prueba2.md')).toBe(true);
  });
  test('debería retornar false si no existe la ruta ', ()=>{
    expect(index.fileExist('./mentira.js')).toBe(false);
   });
});
// verificar si es absoluta
describe('validateToabsolute', () => {

  test('Debería ser una función', () => {
    expect(typeof index.validateToabsolute).toBe('function');
  });
  test('debería retornar la ruta si es absoluta', ()=>{
   expect(index.validateToabsolute('C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\UsersLaboratoriaOneDriveEscritorioProyectos LaboratoriaBOG002-md-linksindex.js')).toBe('C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\UsersLaboratoriaOneDriveEscritorioProyectos LaboratoriaBOG002-md-linksindex.js')
  });
  test('debería convertir la ruta a absoluta si es relativa ', ()=>{
    expect(index.validateToabsolute('./Prueba2.js')).toBe('C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\Prueba2.js');
   });
});
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
 // validar si lee los archivos
//  describe('readFile', () => {
//   it('debería ser una función', () => {
//     expect(typeof index.readFile).toBe('function');
//   });

//   it('leer el archivo', () => {
//     expect(index.readFile('./Prueba2.md')).toEqual('');
//   });
// });
describe('readFile', () => {
  it('debería ser una función', () => {
    expect(typeof index.readFile).toBe('function');
  });

  // it('debería leer el archivo', () => {
  //   expect(readFiles('./Prueba2.md')).toEqual('');
  // });
});

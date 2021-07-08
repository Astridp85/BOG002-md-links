
const {
    fileExist,
    validateToabsolute,
    validFile,
    validDirectory,
    getExtfile,
    validationExtension,
    readFile,
    getallLinks,
} = require('./index.js');

// Función mdLinks

const  mdLinks = (path, options) => new Promise ((resolve, rejects) => {
  // Primero verificamos si el path existe
  if (fileExist (path) === true){
    resolve('Esta ruta si existe');
    // Segundo se verifica si es absoluta
  
    const pathAbsolute = validateToabsolute(path);
    // se verifica si es archivo
    if (validFile(pathAbsolute)=== true){
      const pathExt =  getExtfile (pathAbsolute);

      // validando extensión
      if (validationExtension(pathExt)=== true){
        resolve ('El archivo si es markdown (.md)');
        // leyendo archivos y extrayendo links

      }
    }
  }

});
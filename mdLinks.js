
const index = require('./index.js');

// Función mdLinks

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  // Primero verificamos si el path existe
  if (index.fileExist(path) === true) {
    // resolve('Esta ruta si existe');
    // Segundo se verifica si es absoluta - convertirla
    const pathAbsolute = index.validateToabsolute(path);
  
    // const absolutePath = pathToAbsolute(path); 

    // se verifica si es archivo
    if (index.validFile(pathAbsolute) === true) {
      const pathExt = index.getExtfile(pathAbsolute);

      // validando extensión
      if (index.validationExtension(pathExt) === true) {
        // resolve('El archivo si es markdown (.md)');
        // leyendo archivos y extrayendo links
        const allLinks = index.getallLinks(pathAbsolute);

        if (options) {
          if (options.validate === true) {
            resolve(index.validateOptions(allLinks));
          } else {
            resolve(allLinks);
          }
        } else {
          resolve(allLinks);
        }
      } else {
        reject('Este no es un archivo .md');
      }
    } else {//  Leer el directorio y guardar los archivos en un array.
      const allFilesmd = index.listDirectoryFiles(pathAbsolute);
      
      if (allFilesmd.length > 0) {
        //Se extrae los links del directorio
        const allLinks = index.getallLinks(allFilesmd);
        if (options) {
          if (options.validate === true) {
          resolve(index.validateOptions(allLinks));
         
          } else {
            resolve(allLinks);
          }
          
        } else {
          resolve(allLinks);
        }
      } else {
        reject('No Existe ningun archivo .md en el directorio');
        // reject(new Error('No Existe ningun archivo .md en el directorio'));
      }
    }
  } else {
    reject('No Existe la ruta');
  }
});

// mdLinks('C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\Prueba2.md', { validate: true })
//   .then((links) => {
//     console.log(links)
//   })
//   .catch(console.error);
  // C:\\Users\\Laboratoria\\OneDrive\\Escritorio\\Proyectos Laboratoria\\BOG002-md-links\\Prueba2.md'
module.exports = {
  mdLinks,

};

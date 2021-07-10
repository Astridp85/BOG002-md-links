
const {
  fileExist,
  validateToabsolute,
  validFile,
  getExtfile,
  validationExtension,
  getallLinks,
  listDirectoryFiles,
  validateOptions,

} = require('./index.js');

// Función mdLinks

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  // Primero verificamos si el path existe
  if (fileExist(path) === true) {
    // resolve('Esta ruta si existe');
    // Segundo se verifica si es absoluta
    const pathAbsolute = validateToabsolute(path);
    // se verifica si es archivo
    if (validFile(pathAbsolute) === true) {
      const pathExt = getExtfile(pathAbsolute);

      // validando extensión
      if (validationExtension(pathExt) === true) {
        // resolve('El archivo si es markdown (.md)');
        // leyendo archivos y extrayendo links
        const allLinks = getallLinks(pathAbsolute);

        if (options) {
          if (options.validate === true) {
            resolve(validateOptions(allLinks));
          } else {
            resolve(allLinks);
          }
        } else {
          resolve(allLinks);
        }
      } else {
        reject('Esteno es un archivo .md');
      }
    } else {//  Leer el directorio y guardar los archivos en un array.
      const allFilesmd = listDirectoryFiles(pathAbsolute);
      // console.log(allFilesmd)
      if (allFilesmd.length > 0) {
        //Se extrae los links del directorio
        const allLinks = getallLinks(allFilesmd);
        if (options) {
          if (options.validate === true) {;
          resolve(validateOptions(allLinks));
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
mdLinks('C:\Users\Laboratoria\OneDrive\Escritorio\Proyectos Laboratoria\BOG002-md-links\Prueba2.md')
mdLinks('Prueba2.md')
.then(console.log)
.catch(console.log)


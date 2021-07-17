
// llamado de documenación de node 
// libreria de node.js que permite interactuar con el sistema de archivos (file system)
const fs = require('fs');
const path = require('path');
// libreria MARKED para crear nuevas instancias en este caso objetos (Links)
const marked = require('marked');
const fetch = require('node-fetch');


// Validar si la ruta existe 
const fileExist = (file) => (fs.existsSync(file));

// validar ruta absoluta o si no convertirla
const validateToabsolute = (file) => ((path.isAbsolute(file)) ? file : path.resolve(file));



// const validateToabsolute = path => {
//   return resolve(path);
// };

// Verificar si es un archivo 
const validFile = (file) => fs.statSync(file).isFile();

// verificar si es un directorio
const validDirectory = (file) => fs.statSync(file).isDirectory();



// Obtener la extensión del archivo
const getExtfile = (file) => path.extname(file);
// console.log (getExtfile('./Prueba.txt'));

//validando extensión de archivos md
const validationExtension = (path) => {
  return path.toLowerCase().endsWith('.md');
};
// console.log (validationExtension('./Prueba.txt'));

// Leyendo los archivos
// //utf lenguaje humano porque entrega solo números
const readFile = (file) => fs.readFileSync(file, 'utf-8');
//

// Función que me ayuda a obtener links de un archivo con extensión md
// usando marked extrayendo el href, título y el texto 
// _ es como una especie de variable de omisión, es decir que no será de mucha utilidad o es poco relevante su uso

const getLinks = (ruta, arraysLinksFile) => {

  // se crea nueva instancia con new
  const renderer = new marked.Renderer();
  //.link es un metodo 
  renderer.link = (href, _title, text) => {
    if (href.includes('http')) {
      arraysLinksFile.push({
        href,
        text,
        file: ruta,
      })
    }
  }
  marked(readFile(ruta), { renderer });


};
// console.log (typeof getLinks);

// extraer Links
const getallLinks = (arrayFiles) => {
  const arraysLinksFile = [];
  if (typeof (arrayFiles) === 'object') {
    arrayFiles.forEach((arrayFiles) => getLinks(arrayFiles, arraysLinksFile));
  } else {
    getLinks(arrayFiles, arraysLinksFile);
  }
  return arraysLinksFile;
};

// Leer Directorio y guardar archivos .md en un array

const listDirectoryFiles = (route, fileDirectorio) => {
  const files = fs.readdirSync(route);

  let arrayOfffile = fileDirectorio || [];
  files.forEach((file) => {
    const nextPath = path.join(route, file);
    //validando directorio 
    if (validDirectory(nextPath) === true) {
      arrayOfffile = listDirectoryFiles(nextPath, arrayOfffile);
    } else {
      const pathExt = getExtfile(nextPath);

      if (validationExtension(pathExt) === true) {
        arrayOfffile.push(nextPath);
      }

    }
  });
  return arrayOfffile;

}


// Función para extraer la información de los links (Petición Http con fetch)
//map() crea un nuevo array con los resultados de la llamada a la función indicada 
const validateOptions = (arrayAllLinks) => {
  return Promise.all(arrayAllLinks.map(link => {
    return new Promise((resolve) => {
      fetch(link.href)
        .then(res => {
          if (res.status > 400) {
            link.status = res.status;
            link.response = "fail";
            resolve(link);
          } else {
            link.status = res.status;
            link.response = res.statusText;
            resolve(link); 
          }
        })
        .catch(err => {
          if(err){
            link.status = null;
            link.response = "fail"
            resolve(link);
          }
          });
        });
      }));
    };
// const arrLink = [{
//   file: 'readme.md',
//   href: 'http://google.com',
//   text: 'hola',
// },
// {
//   file: 'Prueba2.md',
//   href: 'http:/Facebook.com',
//   text: 'Hello'

// }]

// validateOptions(arrLink).then ((result)=>{
//   console.log (result);

// })

module.exports = {
  fileExist,
  validateToabsolute,
  validFile,
  getExtfile,
  readFile,
  validationExtension,
  getLinks,
  getallLinks,
  listDirectoryFiles,
  validateOptions,

};

//   .then ((result)=> {
//    const statusLinksOk = {...link, status: result.status, message:result.statusText}
//     resolve (statusLinksOk)
//   })
// .catch (error => {
//   const statusLinkFail = {...link, status:'fail', message: error.errno}
//   resolve (statusLinkFail);

// }))

// return linksValid
// };











// fs.readFile('./Prueba2.md', 'utf8',(err, data) => {
// if (err) {
// throw err;
// }
// console.log(data);
// });


// const filehound = Filehound.create()
//   .paths('/some/dir')
//   .ext('json')
//   .find();





// const links = (path) => {
//   fs.readFile(path, 'utf8', (err, data) => {
//     if (err) {
//       throw err;
//    }
    //new crear nueva instancia 
    //marked libreria
    //renderer metodo

//     let links = [];
//     const renderer = new marked.Renderer();
//     //.link es un metodo
//     renderer.link = function (href, title, text) {
//       links.push(
//         {
//           href: href,
//           text: text,
//           title: path
//         }
//       )
//     }
//     marked(data, { renderer: renderer });
//    console.log(links)

//   })
// }

// console.log(links('./README.md'));


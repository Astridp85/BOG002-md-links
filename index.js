
// llamado de documenación de node 
// libreria de node.js que permite interactuar con el sistema de archivos (file system)
const fs = require('fs');
const path = require('path');
// libreria MARKED para crear nuevas instancias en este caso objetos (Links)
const marked = require('marked');
// const Filehound = require ('filehound');

const fetch = require('node-fetch');
const chalk = require ('chalk');
const { resolve } = require('path');
const { rejects } = require('assert');



// Validar si la ruta existe 
const fileExist = (file) => (fs.existsSync(file));
// console.log (chalk.red(fileExist('./Prueba2.md')));
// console.log(fileExist('./mentira.js'));

// validar ruta absoluta o si no convertirla
const validateToabsolute = (file)=> ((path.isAbsolute(file)) ? file : path.resolve(file));

// console.log (chalk.blue(validateToabsolute('./Prueba2.md')));
// console.log (chalk.yellow(validateToabsolute('./Prueba.txt')));
// console.log (validateToabsolute('C:\Users\Laboratoria\OneDrive\Escritorio\Proyectos Laboratoria\BOG002-md-links\index.js'));

// Verificar si es un archivo 
const validFile = (file) => fs.statSync(file).isFile();
// console.log (chalk.red(validFile('./Prueba2.md')));

// verificar si es un directorio
const validDirectory = (file) => fs.statSync(file).isDirectory();
// console.log (chalk.magenta(validDirectory('./Prueba2.md')));
// console.log (chalk.bgWhite(validDirectory('./node_modules')));

// Obtener la extensión del archivo
const getExtfile = (file) => path.extname(file);
// console.log(chalk.greenBright(getExtfile('./Prueba2.md')));
// console.log (chalk.magenta(getExtfile('./Prueba.txt')));

//validando extensión de archivos md
const validationExtension = (path) => {
    return path.toLowerCase().endsWith('.md');
  };
  // console.log(chalk.red(validationExtension('./Prueba.txt')));
  // console.log(chalk.blue(validationExtension('./Prueba2.md')));

  // Leyendo los archivos
// //utf lenguaje humano porque entrega solo números
  const readFile = (file) => fs.readFileSync(file,'utf-8');
  // console.log (chalk.yellow(readFile('./Prueba2.md')));
  // console.log (chalk.blueBright(readFile('./Prueba.txt')));

  // Función que me ayuda a obtener links de un archivo con extensión md
// usando marked extrayendo el href, título y el texto 

const getLinks = (ruta, arraysLinksFile) => {

  // se crea nueva instancia con new
  const renderer = new marked.Renderer();
     //.link es un metodo 
  renderer.link = (href, _title, text) => {
    if (href.includes('http')){
      arraysLinksFile.push({
        href,
        text,
        file:ruta,
      })
    }
  }
  marked(readFile(ruta), { renderer });

};


// extraer Links
const getallLinks = (arrayFiles) => {
  const arraysLinksFile = [];
  if (typeof (arrayFiles) === 'object'){
    arrayFiles.forEach((arrayFiles) => getLinks(arrayFiles, arraysLinksFile));
  }else {
    getLinks(arrayFiles, arraysLinksFile);
  }
  return arraysLinksFile;
};
// console.log (getallLinks('./Prueba2.md'));


// Leer Directorio y guardar archivos .md en un array

const listDirectoryFiles = (route, fileDirectorio) => {
  const files = fs.readdirSync(route);

  let arrayOfffile = fileDirectorio || [];
  files.forEach((file)=>{
    const nextPath = path.join(route, file);
    //validando directorio 
    if (validDirectory(nextPath)=== true){
      arrayOfffile = listDirectoryFiles(nextPath,arrayOfffile);
    }else {
      const pathExt =  getExtfile(nextPath);

      if (validationExtension(pathExt)=== true) {
        arrayOfffile.push(nextPath);
      }
   
    }
  });
  return arrayOfffile;
 
}
// console.log (chalk.yellow(listDirectoryFiles('./node_modules')));



// Función para extrar la información de los links (Petición Http con fetch)
const validateOptions = (arrayAllLinks) => {
  return Promise.all (arrayAllLinks.map(link => {
    return new Promise ((resolve)=>{
      fetch (link.href)
      .then(res=>{
        link.status = res.statusText;
        link.code = res.status;
        resolve (link);
      })
      .catch(err=>{
        // reject (err);
        if(err){
          link.status = 'FAIL';
          link.response = null;
          resolve (link);
        }
      })
    })
  }))
}
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
  validationExtension,
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


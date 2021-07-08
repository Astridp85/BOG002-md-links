
// llamado de documenación de node 
const fs = require('fs');
const path = require('path');
const marked = require('marked');
// const Filehound = require ('filehound');

const fetch = require('node-fetch');
const chalk = require ('chalk');
const { resolve } = require('path');



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
  renderer.link = (href, title, text) => {
    if (href.includes('http')){
      arraysLinksFile.push({
        href,
        title,
        text,
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
  return (arrayOfffile);
 
}
// console.log (chalk.yellow(listDirectoryFiles('./node_modules')));




const validateOptions = (arrayAllLinks) => {
  const linksValid = arrayAllLinks.map((link) => fetch (link.href)


.then ((res)=> ({
    href:link.href,
    text: link.text,
    file: link.file,
    status: res.status,
    massage: res.statusText,
  }))
  .catch (() => ({
    href:link.href,
    text: link.text,
    file: link.file,
    status: 'Error',
    massage: 'fail',
  })));

  return Promise.all(linksValid);
};
const arrLink = [{
  file: 'readme.md',
  href: 'http://google.com',
  text: 'hola',
},
{
  file: 'Prueba2.md',
  href: 'http:/Facebook.com',
  text: 'Hello'
  
}]

validateOptions(arrLink).then ((result)=>{
  console.log (result);

})

module.exports = {
  fileExist,
  validateToabsolute,
  validFile,
  validDirectory,
  getExtfile,
  validationExtension,
  readFile,
  getallLinks,
 
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


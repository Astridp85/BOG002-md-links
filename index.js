
// llamado de documenación de node 
const fs = require('fs');
const path = require('path');
const marked = require('marked');
// const Filehound = require ('filehound');

const fetch = require('node-fetch');



// Validar si la ruta existe 
const fileExist = (file) => (fs.existsSync(file));
// console.log (fileExist('./Prueba2.md'));

// validar ruta absoluta o si no convertirla
const validateToabsolute = (file)=> ((path.isAbsolute(file)) ? file : path.resolve(file));

// console.log (validateToabsolute('./Prueba2.md'));
// console.log (validateToabsolute('./Prueba.txt'));

// Verificar si es un archivo 
const validFile = (file) => fs.statSync(file).isFile();
// console.log (validFile('./Prueba2.md'));

// verificar si es un directorio
const validDirectory = (file) => fs.statSync(file).isDirectory();
// console.log (validDirectory('./Prueba2.md'));
// console.log (validDirectory('./node_modules'));

// Obtener la extensión del archivo
const getExtfile = (file) => path.extname(file);
// console.log(getExtfile('./Prueba2.md'));
// console.log (validateAbsolute('./Prueba.txt'));

//validando extensión de archivos md
const validationExtension = (path) => {
    return path.toLowerCase().endsWith('.md');
  };
  // console.log(validationExtension('./Prueba.txt'));
  // console.log(validationExtension('./Prueba2.md'));

  // Leyendo los archivos
// //utf lenguaje humano porque entrega solo números
  const readFile = (file) => fs.readFileSync(file,'utf-8');
  // console.log (readFile('./Prueba2.md'));
  // console.log (readFile('./Prueba.txt'));

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
// console.log (getallLinks('./README.md'));


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
// console.log (listDirectoryFiles('./node_modules'));



// Función para crear data  href,text file o ruta
//en marked obtenemos  href , title y text
//pero el requerimiento pide href ,text y file(ruta)
// .map() crea un nuevo array con los  resultados de la llamada a la función

// const newData = (ruta, data) => {
//   const links = getallLinks(data);

//   return links.map(link => {
//     return {
//       href: link.href,
//       text: link.text,
//       file: ruta
//     };
  
//   });
 
// };
// console.log(newData('./Prueba2.md'));

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
  // console.log (Promise.all(linksValid));
  // console.log (arrayAllLinks)
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

validateOptions(arrLink).then ((res)=>{

console.log (res);
})



// Función mdLinks

// const  mdLinks = (path, options) => new Promise ((resolve, rejects) => {
//   // Primero verificamos si el path existe
//   if (fileExist (path) === true){
//     resolve('Esta ruta si existe');
//     // Segundo se verifica si es absoluta
  
//     const pathAbsolute = validateToabsolute(path);
//     // se verifica si es archivo
//     if (validFile(pathAbsolute)=== true){
//       const pathExt =  getExtfile (pathAbsolute);

//       // validando extensión
//       if (validationExtension(pathExt)=== true){
//         resolve ('El archivo si es markdown (.md)');
//         // leyendo archivos y extrayendo links

//       }
//     }
//   }

// });










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



// llamado de documenación de node 
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const Filehound = require ('filehound');

// const fecth = require('node-fetch');


// const renderer = new  marked.Renderer();

// Validar si la ruta existe 
const fileExist = (file) => (fs.existsSync(file));
// console.log (fileExist('./Prueba2.md'));

// validar ruta absoluta o si no convertirla
const validateAbsolute = (file)=> ((path.isAbsolute(file)) ? file : path.resolve(file));

// console.log (validateAbsolute('./Prueba2.md'));
// console.log (validateAbsolute('./Prueba.txt'));

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

const newData = (ruta, data) => {
  const links = getLinks(data);

  return links.map(link => {
    return {
      href: link.href,
      text: link.text,
      file: ruta
    };
  
  });
 
};
console.log(newData('./Prueba2.md'));


//validando extensión de archivos md

// const validationExtension = (path) => {
//   return path.toLowerCase().endsWith('.md');
// };
// console.log(validationExtension('./Prueba.txt'));
// console.log(validationExtension('./Prueba2.md'));
// const mdLinks = path => {
//   return new Promise((resolve, reject) => {
//     const absolutePath = pathToabsolute(path);

//     validPath(absolutePath)
//       .then(type => {
//         if (type === 'File') {
//           if (!validationExtension(absolutePath)) {
//             reject(new Error('Esta extensión de archivo no es válida'));
//             return;
//           }

//           readFile(absolutePath)
//             .then(data => {
//               resolve(newData(absolutePath, data));
//             }).catch(err => {
//               reject(err);
//               return;
//             });
           
//         }
      
//       });
//     });
//     };
              







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


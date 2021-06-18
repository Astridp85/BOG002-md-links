



// llamado de documenación de node 
const fs = require ('fs');
const resolve = require ('path').resolve;
const marked = require ('marked');
const filehound = require ('filehound');



const readFile = (fileName, type) => {
  return new Promise((resolve, reject) => {
    // Read a file
    fs.readFile(fileName, type ,(err, data) => {
      if (err){
      reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
 };


 readFile("Prueba.txt", "utf-8")
  .then(resolve => {
    console.log("Archivo:" , resolve);
  })
  .catch(err => {
    console.log(err)
  })

// //ruta y callback
// //utf lenguaje humano porque entrega solo números
// //Se lee ruta del arvhivo md


fs.readFile('./Prueba2.md', 'utf8',(err, data) => {
if (err) {
throw err;
}
console.log(data);
});

 
// const filehound = Filehound.create()
//   .paths('/some/dir')
//   .ext('json')
//   .find();
 
// filehound.then(console.log);



const links = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    //new crear nueva instancia 
    //marked libreria
    //renderer metodo

    let links = [];
    const renderer = new marked.Renderer();
    //.link es un metodo
    renderer.link = function (href, title, text) {
      links.push(
        {
          href: href,
          text: text,
          file: path
        }
      )
    }
    marked(data, { renderer: renderer });
    console.log(links)

  })
}

console.log(links('./Prueba2.md'));











// const pathToabsolute = path => {
//     return resolve(path);
// };

// // validar la extensión de un archivo md 
// const isValidexten = (path) => {
//   return path.toLowerCase().endsWith('.md');
// }

// const mdLinks = path => {
//     return new Promise ((resolve, reject) =>{
//         const absolutePath = pathToabsolute (path);

//     })
// }



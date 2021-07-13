#!/usr/bin/env node

const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');
const mdLinks = require("./mdLinks.js");
const argv = require('yargs').argv;


// //Banner personalizado de entrada
clear();
console.log(chalk.magentaBright(figlet.textSync('MdLinks Astrid', {horizontalLayout:'full'})));
// mdLinks.mdLinks('./Prueba2.md', { validate: true })
//   .then((links) => {
//     console.log(links)
//   })
//   .catch(console.error);


mdLinks.mdLinks(argv._[0])
  .then(links => {
    links.forEach(link => {
        console.log(`${chalk.green(link.file)} ${chalk.yellow(link.href)} ${chalk.magenta(link.text)}`);
    });
  })
  .catch(error => {
   console.log(chalk.red(error));
  });
// argv._[0] es el primer argumento
// node ./mdLinks.js ./Prueba2.md



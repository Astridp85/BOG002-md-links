#!/usr/bin/env node

const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');
const mdLinks = require("./mdLinks.js");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const [, , ...args] = process.argv;
const path = args[0];



//Banner de entrada personalizado
clear();
console.log(chalk.magentaBright(figlet.textSync('MdLinks Astrid', { horizontalLayout: 'full' })));

// console.log(process.argv);

if (argv.validate || argv.v){
  
mdLinks.mdLinks(path, { validate: true })
  .then(links => {
    
    console.log(links)


  })
} else if (argv.stats || argv.s) {
return total = mdLinks.mdLinks(path).then(links => {
  console.log({total:links.length})
});
// const unique = 
// console.log ('aquí estaría unique') })
} else if ((argv.stats && argv.validate )|| argv.s &&  argv.v ){
  console.log("si funciona")
}
else {
  
  mdLinks.mdLinks(path, { validate: false })
  .then(links => {
    links.map(link => {
      console.log({
        File:link.file,
        href: link.href,
        text :link.text,
        })
      })
  }) .catch(err => {
    console.error(chalk.red(err))
  });
  // .catch(console.error);
}


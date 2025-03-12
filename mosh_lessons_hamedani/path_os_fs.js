// the os module
const os = require('node:os');

console.log(os.totalmem());
console.log(os.freemem());
console.log(os.type());


const fs = require('node:fs');
fs.readdir('./', (err, files)=>{
  if (err) console.log(err);
  else console.log(files);
})
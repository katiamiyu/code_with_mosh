const http = require('node:http');

const server = http.createServer((req,res)=>{
  if(req.url == '/'){
    res.write('<h1>Helloworld</h1>');
    res.end();
  }
  if(req.url == '/api/courses') {
    res.write(JSON.stringify([1,2,5]));
    res.end();
  }
});

server.listen(3000);

console.log(`server listening on port 3000`);
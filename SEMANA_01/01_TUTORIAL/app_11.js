// Pede a requisição do protocolo http pra rodar
const http = require('http');
// Setando o ip 
const hostname = '127.0.0.1';
// Setando a porta 
const port = 3011;
// Criando o servidor com a requisição e a porta
const server = http.createServer((req, res) => {
  // Coloca o status do servidor como 200
  res.statusCode = 200;
  // Abre o servidor HTML (Front-end)
  res.setHeader('Content-Type', 'text/html');
  res.end('<!DOCTYPE html> <head> <title>Etapa 0 - INSTALACAO</title></head> \
              <body>\
                <div id="main"> \
                       <h1> Etapa 1 - INSTALACAO - Servidor Node.js </h1> \
                       <H2> Meu servidor NODE.js funciona!</H2> </div> \
              </body> \
           </html>');
});
// Le o ip e a porta do servidor
server.listen(port, hostname, () => {
  // Mostra toda a porta no console
  console.log(`Server running at http://${hostname}:${port}/`);
});
// Faz as mesmas coisas que o ínicio do bloco em app_11.js, porém define uma porta diferente
const http    = require('http');
const sqlite3 = require('sqlite3').verbose(); 
const hostname = '127.0.0.1';
const port = 3012;
//

// Faz as mesmas coisas que no bloco const server em app_11.js
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  // 

  // Define a variável db como um 'fork' da base de dados "dbUser.db"
  var db = new sqlite3.Database('dbUser.db');
  // Está coletando os dados
  db.get('SELECT * \
          FROM tbUser \
          WHERE userId = 1', [], (err, row) => {
    // Caso a coleta foi bem feita de maneira correta, é aberto uma pagina em HTML com as etapas escritas feitas.
		res.write("<h1> Etapa 1 - INSTALACAO </h1>") 
    res.write("<h2> Servidor de Banco de Dados SQLite3 </h2>") 
	  res.write("<h3> " + row.title + "</h3>"); 
	  res.end(); 
   });
});
// O servidor le a porta e o hostname para enviar pro console esses dados
server.listen(port, hostname, () => {
  // Console printa esses dados concatenados
  console.log(`Server running at http://${hostname}:${port}/`);
});
const express = require('express'); 
const cors = require('cors')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'database.db';

const hostname = '127.0.0.1';
const port = 3071;
const app = express();

app.use(cors());

app.use(express.static("/frontend"));

app.use(express.json());

app.get('/dados', (_req, res) => {

    let db = new sqlite3.Database(DBPATH);

    let query = 'SELECT * FROM experiencia'

    db.all(query, [], (err, rows) => {
        if (err) {
            throw err;
        }

        res.json(rows);
    });
})

app.post('/inserirDados', urlencodedParser, (req, res) => {   
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
    const {nome_empresa, ano_inicio, ano_fim} = req.body;
    let db = new sqlite3.Database(DBPATH);

    let query = 'INSERT INTO experiencia(nome_empresa, ano_inicio, ano_fim) VALUES (?,?,?)'

    db.run(query, [nome_empresa, ano_inicio, ano_fim], (err) => {
        if (err) {
            throw err;
        }
        res.send('Dados inseridos com sucesso!');
    })
    db.close();
})

app.delete('/deleteDados', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
    const {id_exp} = req.params.id_exp;
    let db = new sqlite3.Database(DBPATH);

    let query = 'DELETE FROM dados_pessoais WHERE id_dados = ? ';

    db.run(query, [id_exp], (err) => {
        if (err) {
            throw err;
        }
        res.send('Dados deletados com sucesso!');
    })
    db.close();
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
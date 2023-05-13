// Importando bibliotecas necessárias.
const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors")
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


// Inicializando a aplicação.
const app = express()

// Definindo regras gerais.
app.use(express.json())
app.use(cors())

// Realizando conexão com o banco de dados.
const DBPATH = 'data/database.db'


// Criando endpoints

// POST /formacao
app.post("/formacao", (req, res) => {

    const {escola, curso, inicio, fim, grau, nota, descricao} = req.body;

    let db = new sqlite3.Database(DBPATH); // Abre o banco

    const query = "INSERT INTO formacao (escola, curso, inicio, fim, grau, nota, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)"

    db.run(query, [escola, curso, inicio, fim, grau, nota, descricao], (error) => {

        if(error) {
            throw new Error(error);
        }

        return res.status(201).json({
            title:"Formação criada com sucesso."
        })

    })
})

// PUT /formacao
app.put("/formacao/:id", urlencodedParser,(req, res) => {
    
        const {escola, curso, inicio, fim, grau, nota, descricao} = req.body;
    
        let db = new sqlite3.Database(DBPATH); // Abre o banco
    
        const query = "UPDATE formacao SET escola = ?, curso = ?, inicio = ?, fim = ?, grau = ?, nota = ?, descricao = ? WHERE rowid = ?"
    
        db.run(query, [escola, curso, inicio, fim, grau, nota, descricao, req.params.id], (error) => {
    
            if(error) {
                throw new Error(error);
            }
    
            return res.status(200).json({
                title:"Formação atualizada com sucesso."
            })
    
        })

})

// GET /formacao
app.get("/formacao", urlencodedParser,(req, res) => {
    
        let db = new sqlite3.Database(DBPATH); // Abre o banco
    
        const query = "SELECT rowid, * FROM formacao"
    
        db.all(query, (error, rows) => {
    
            if(error) {
                throw new Error(error);
            }
    
            return res.status(200).json({
                title:"Formações retornadas com sucesso.",
                formacoes: rows
            })
    
        })
    
    }
)

// GET /formacao/:id
app.get("/formacao/:id", urlencodedParser, (req, res) => {

    let db = new sqlite3.Database(DBPATH); // Abre o banco

    const query = "SELECT rowid, * FROM formacao WHERE rowid = ?"

    db.get(query, [req.params.id], (error, rows) => {

        if(error) {
            throw new Error(error);
        }

        return res.status(200).json({
            title:"Formação retornada com sucesso.",
            formacao: rows
        })

    })

})

// DELETE /formacao
app.delete("/formacao/:id", urlencodedParser, (req, res) => {
        
    let db = new sqlite3.Database(DBPATH); // Abre o banco

    const query1 = "SELECT rowid, * FROM formacao WHERE rowid = ?"

    db.get(query1, [req.params.id], (err, rows) => {

        if(err) {
            throw new Error(err);
        }

        if (!rows) {

            return res.status(404).json({
                title: "Usuário não encontrado. Impossível deletar."
            })

        }

        const query = "DELETE FROM formacao WHERE rowid = ?"

            db.run(query, [req.params.id], (error) => {

                if(error) {
                    throw new Error(error);
                }

                return res.status(200).json({
                    title:"Formação deletada com sucesso."
                })

            })
    })

}
)

// POST /experiencia
app.post("/experiencia", urlencodedParser, (req, res) => {
    const {nome_empresa, ano_inicio, ano_fim, cargo, descricao} = req.body

    let db = new sqlite3.Database(DBPATH) // Abre o banco

    const query = "INSERT INTO experiencia (nome_empresa, ano_inicio, ano_fim, cargo, descricao) VALUES (?, ?, ?, ?, ?)"

    db.run(query, [nome_empresa, ano_inicio, ano_fim, cargo, descricao], (error) =>{
        if(error){
            throw new Error(error)
        }
        return res.status(201).json({
            title: "Experiência criada com sucesso."
        })
    })
})

// POST /realizacoes
app.post("/realizacoes", urlencodedParser, (req, res) =>{
    const {realizacao_nome, realizacao_ano, realizacao_descricao} = req.body

    let db = new sqlite3.Database(DBPATH) // Abre o banco

    const query = "INSERT INTO realizacoes(realizacao_nome, realizacao_ano, realizacao_descricao) VALUES(?, ?, ?)"

    db.run(query, [realizacao_nome, realizacao_ano, realizacao_descricao], (error) =>{
        if (error){
            throw new Error(error)
        }
        return res.status(201).json({
            title: "Realização criada com sucesso."
        })
    })
})

// POST /habilidades
app.post("/habilidades", urlencodedParser, (req, res) => {
    const {python, sql, matematica} = req.body

    let db = new sqlite3.Database(DBPATH)

    const query = "INSERT INTO habilidades(python, sql, matematica) VALUES(?, ?, ?)"

    db.run(query, [python, sql, matematica], (error) =>{
        if(error) {
            throw new Error(error);
        }
        return res.status(201).json({
            title: "Habilidade criada com sucesso."
        })
    })
})

// POST /sobre
app.post("/sobre", urlencodedParser, (req, res) => {
    const {endereco, email, descricao_sobre, telefone} = req.body

    let db = new sqlite3.Database(DBPATH);

    const query = "INSERT INTO sobre(endereco, email, descricao_sobre, telefone) VALUES(?, ?, ?, ?)"

    db.run(query, [endereco, email, descricao_sobre, telefone], (error) =>{
        if(error) {
            throw new Error(error)
        }
        return res.status(201).json({
            title: "Sobre criado com sucesso."
        })
    })
})

// POST /personalidade
app.post("/personalidade", urlencodedParser, (req, res) =>{
    const {personalidade_descricao} = req.body

    let db = new sqlite3.Database(DBPATH);

    const query = "INSERT INTO personalidade(personalidade_descricao) VALUES(?)"

    db.run(query, [personalidade_descricao], (error) =>{
        if(error) {
            throw new Error(error)
        }
        return res.status(201).json({
            title: "Personalidade criada com sucesso."
        })
    })
})


// Definindo porta da aplicação.
const port = 3000


// Inicializando o servidor.
app.listen(port, () => {
    console.log("Servidor iniciado com sucesso. Escutando a porta http://localhost:"+ port)
})



// Importando bibliotecas necessárias.
const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors")

// Inicializando a aplicação.
const app = express()

// Definindo regras gerais.
app.use(express.json())
app.use(cors())

// Realizando conexão com o banco de dados.
const db = new sqlite3.Database("./database.db")
// Criando banco de dados.
db.run("CREATE TABLE IF NOT EXISTS formacao (escola TEXT, curso TEXT, inicio TEXT, fim TEXT, grau TEXT, nota REAL, descricao TEXT)")
db.close()

// Criando endpoints

// POST /formacao
app.post("/formacao", (req, res) => {

    const {escola, curso, inicio, fim, grau, nota, descricao} = req.body;

    const db = new sqlite3.Database("./database.db")

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
app.put("/formacao/:id", (req, res) => {
    
        const {escola, curso, inicio, fim, grau, nota, descricao} = req.body;
    
        const db = new sqlite3.Database("./database.db")
    
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
app.get("/formacao", (req, res) => {
    
        const db = new sqlite3.Database("./database.db")
    
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
app.get("/formacao/:id", (req, res) => {

    const db = new sqlite3.Database("./database.db")

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
app.delete("/formacao/:id", (req, res) => {
        
    const db = new sqlite3.Database("./database.db")

    const query1 = "SELECT rowid, * FROM formacao WHERE rowid = ?"

    db.get(query1, [req.params.id], (err, rows) => {

        if(err) {
            throw new Error(error);
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


// Definindo porta da aplicação.
const port = 3000


// Inicializando o servidor.
app.listen(port, () => {
    console.log("Servidor iniciado com sucesso. Escutando a porta http://localhost:"+ port + "/formacao")
})



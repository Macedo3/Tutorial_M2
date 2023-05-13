// Carregando os dados
window.addEventListener("load", () => { // Ao entrar na tela carregará o axios
    axios.get('http://localhost:3000/formacao').then((response) => {
        console.log(response.data.formacoes)
        let html = '' // Criando a variável HTML para ser enviada logo abaixo alguns itens.
        response.data.formacoes.map((formacao) => { // Enviando o HTML pela home.js.
            html += ` 
            
            <div class="formacao" id="${formacao.rowid}">
                <div class="cabecalho">
                    <p class="escola">${formacao.escola}</p>
                    <div class="controles">
                        <a class="editar" href='/frontend/atualizar.html?id=${formacao.rowid}'>Editar</a>
                        <a class="excluir" onclick='excluir(this.id)' id='excluir-${formacao.rowid}'>Excluir</a>
                    </div>
                </div>
                <p class="curso">Curso: ${formacao.curso}</p>
                <p class="inicio">Início: ${formacao.inicio}</p>
                <p class="fim">Fim: ${formacao.fim}</p>
                <p class="grau">Grau: ${formacao.grau}</p>
                <p class="nota">Nota: ${formacao.nota}</p>
                <p class="descricao">Descrição: ${formacao.descricao}</p>
            </div>

            `
        })
        const div = document.querySelector("#formacoes") // Puxando informações sobre a div formações.
        div.innerHTML = html // Setando o conteúdo dentro da tag.
    }).catch((err) => { // Procurando algum erro.
        throw new Error(err) // Caso haja, será printado aqui travando a execução.
    });

})

function excluir(id) { // Função de excluir uma linha do banco de dados.
    id = id.substring(8)
    axios.delete(`http://localhost:3000/formacao/${id}`) // Excluindo o id
        .then((response) => {
            console.log(response.data) // Pritando as formações no console, caso esteja correto.

        }).catch((error) => { // Identificando algum erro.
            throw new Error(error) // Caso tenha, seja printado travando a execução.
        })
}


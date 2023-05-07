// Puxando os dados
window.addEventListener("load", () => {
    axios.get('http://localhost:3000/formacao').then((response) => {
        console.log(response.data.formacoes)
        let html = ''
        response.data.formacoes.map((formacao) => {
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
        const div = document.querySelector("#formacoes")
        div.innerHTML = html
    }).catch((err) => {
        throw new Error(err)
    });

})

function excluir(id) {
    id = id.substring(8)
    axios.delete(`http://localhost:3000/formacao/${id}`)
        .then((response) => {
            console.log(response.data)

        }).catch((error) => {
            throw new Error(error)
        })
}


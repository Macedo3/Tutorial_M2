// Definindo as constantes que são utilizadas.
// O conteúdo das constantes serão puxadas do forms no HTML.
const escola = document.querySelector("#escola");
const curso = document.querySelector("#curso");
const inicio = document.querySelector("#inicio");
const fim = document.querySelector("#fim");
const grau = document.querySelector("#escolaridade");
const nota = document.querySelector("#nota");
const descricao = document.querySelector("#descricao");
const button = document.querySelector("#confirm")

// Pegando toda URL
let params = new URL(document.location).searchParams;
// Puxando somente o ID da URL
let id = params.get("id")

// Pegando os dados do back end .get()
// Após o envio dos dados feito pelo backend, será colocado um autofill no formulário com os dados já enviado com o .then((response) => {...})
axios.get(`http://localhost:3000/formacao/${id}`).then((response) => {

        let formacao = response.data.formacao;

        escola.value = formacao.escola
        curso.value = formacao.curso
        inicio.value = formacao.inicio
        fim.value = formacao.fim
        grau.value = formacao.grau
        nota.value = formacao.nota
        descricao.value = formacao.descricao
        
    })
    // Caso tenha algum erro o .catch((err) => {...}) irá identificar e passar as informações travando o servidor.
    .catch((err) => {
        throw new Error(err)
    });

// O button.addEventListener(...) serve para enviar os novos dados colocados ao backend.
button.addEventListener("click", async (event, err) => {
    axios.put(`http://localhost:3000/formacao/${id}`, {
        escola: escola.value,
        curso: curso.value,
        inicio: inicio.value,
        fim: fim.value,
        grau: grau.value,
        nota: nota.value,
        descricao: descricao.value
    }).then(function(response) {
        console.log(response) // Enviará o response ao console.
    })
    .catch(function(error){
        console.log(error) // Caso haja erro, printará no console.
    })
})

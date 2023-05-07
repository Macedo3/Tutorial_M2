const escola = document.querySelector("#escola");
const curso = document.querySelector("#curso");
const inicio = document.querySelector("#inicio");
const fim = document.querySelector("#fim");
const grau = document.querySelector("#escolaridade");
const nota = document.querySelector("#nota");
const descricao = document.querySelector("#descricao");
const button = document.querySelector("#confirm")


let params = new URL(document.location).searchParams;
let id = params.get("id")

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
    .catch((err) => {
        throw new Error(err)
    });

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
        console.log(response)
    })
    .catch(function(error){
        console.log(error)
    })
})

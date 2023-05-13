// 'Importando' o botão do HTML.
const button = document.querySelector("#confirm")


// Executando o axios após o usuário clicar no botão.
button.addEventListener("click", async (event, err) => {
    // Puxando os dados inseridos pelo usuário no formulário com o id de cada item.
    axios.post('http://localhost:3000/formacao', {
        escola: document.querySelector("#escola").value,
        curso: document.querySelector('#curso').value,
        inicio: document.querySelector('#inicio').value,
        fim: document.querySelector('#fim').value,
        escolaridade: document.querySelector('#escolaridade').value,
        nota: document.querySelector('#nota').value,
        descricao: document.querySelector('#descricao').value
      })
      // Vericando a resposta.
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

})

api = 'http://127.0.0.1:3071'

$(document).ready(() => {
    dados.list();
});

var dados = {

    list() {
        $.ajax({
            url: api + '/dados',
            type: 'GET',
            success: data => {
                var tx = '';
                data.forEach(element => {
                    tx += '<p class="text">Nome - '+`${element.nome_empresa}`+'</p>'
                    tx += '<p class="text">Telefone - '+`${element.ano_inicio}`+'</p>'
                    tx += '<p class="text">Email - '+`${element.ano_fim}`+'</p>'
                    tx += '<br>'
                    tx += '<div class="action" style="color: red" onclick="dado.delete(' + `${element.id_dados}` + ')">Excluir</div>';
                    tx += '<br>'
                });
                $('#info').html(tx);
            }
        })

    }
}

var dado = {
    insert(){
        var nome_empresa = prompt('Digite o nome da empresa da empresa: ')
        var ano_inicio = prompt('Digite quando iniciou: ')
        var ano_fim = prompt('Digite quando saiu (Ou não saiu): ')
        console.log(`${nome_empresa} - ${ano_fim} - ${ano_inicio}`);
        if (nome_empresa && ano_fim && ano_inicio){
            if (nome_empresa.trim() != '' && ano_inicio.trim() != '' && ano_fim.trim() != ''){
                $.ajax({
                    type: 'POST',
                    url: api + '/inserirDados',
                    data: {nome_empresa: nome_empresa, ano_inicio: ano_inicio, ano_fim: ano_fim},
                }).done(function (){
                    dados.list();
                }).fail(function (msg){
                    console.log('FAIL')
                }).always(function (msg){
                    console.log('ALWAYS')
                })
            }
        }
    },

    delete(id_dados){
        if (confirm('Confirma a exclusão?')) {
            $.ajax({
                type: 'DELETE',
                url: api + '/deleteDados',
                data: {id_dados: id_dados},
            }).done(function () {
                dados.list();
            }).fail(function (msg) {
                console.log('FAIL');
            }).always(function (msg) {
                console.log('ALWAYS');
            });
        }
    }
}

//PEGA O VALOR DO CPF E ATRIBUI A VARIAVEL
const cep = document.querySelector("#cep")

//TRATA O RESULTADO QUE VEM DA PROMISE PARA EXIBIR NO FORMULARIO
const mostraDados = (result) => {
    //ESSE FOR ARMAZENA OS NOMES DOS CAMPOS QUE VIERAM NO RESULT DENTRO DA VARIAVEL CAMPO
    for (const campo in result)
        //COMPARA OS NOMES DOS CAMPOS QUE VIERAM DO RESULT COM OS ID's DO FORMULÁRIO SE EXISTIR ELE MOSTRA
        if (document.querySelector("#" + campo)) {
            //EXIBE NO FORMULARIO
            document.querySelector("#" + campo).value = result[campo]
        }
}


cep.addEventListener("blur", (e) => {
    //TROCA - POR ESPAÇO EM BRANCO  
    let cepFiltrado = cep.value.replace("-", "")
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    //ACESSA A URL DEFINIDA E ENVIA O CEP PARA BUSCA
    fetch(`https://viacep.com.br/ws/${cepFiltrado}/json/`, options)

        //PROMISE, SE DER CERTO A REQUISIÇÃO ELE PEGA OS DADOS NO FORMATO JSON
        .then(response => {
            response.json()
            // E CHAMA A FUNÇÃO QUE EXIBE OS DADOS NO FORMULÁRIO
            .then(data => mostraDados(data))
        })
        .catch(e => alert("CEP inválido"))

})
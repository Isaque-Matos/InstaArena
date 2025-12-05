// Selecionando os campos de entrada
const nomeUsuario = document.getElementById("usuario");
const emailUsuario = document.getElementById("email");
const senhaUsuario = document.getElementById("senha");
const mensagem = document.getElementById("mensagem");
const button = document.getElementById("button");

function cadastrar(){
    fetch("http://localhost:8080/usuarios",
        {
            headers: {
                'Accept': 'application/Json',
                'Content-Type' : 'application/Json'
            },
            method : "POST",
            body : JSON.stringify({
                 nome : nomeUsuario.value,
                 email : emailUsuario.value,
                 senha : senhaUsuario.value
            })

        })
        .then(function (res) {console.log(res)})
        .catch(function (res) {console.log(res)})
};

// Adicionando um evento de clique no botão "Criar Conta"
button.addEventListener("click", function() {
    // Pegando os valores digitados nos campos
        cadastrar();
        // Exibindo uma mensagem de sucesso
        mensagem.innerHTML = "Cadastro realizado com sucesso! Redirecionando...";

        // Redirecionando para a página de login
        setTimeout(function() {
            window.location.href = "/HTML/indexLogin.html"; // Página de login
        }, 2000); // Atraso de 2 segundos para mostrar a mensagem de sucesso
    
});
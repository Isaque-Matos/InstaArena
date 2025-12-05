const email = document.getElementById("email");
const senha = document.getElementById("senha");
const mensagem2 = document.getElementById("mensagem2");
const logar = document.getElementById("logar");

logar.addEventListener("click", function(event) {
    event.preventDefault(); // Impede o envio do formulário ou recarregamento da página

    // Obtenha os valores digitados
    const emailDigitado = email.value.trim();
    const senhaDigitada = senha.value.trim();

    // Verifica se o email e senha foram preenchidos
    if (!emailDigitado || !senhaDigitada) {
        mensagem2.innerHTML = "Por favor, preencha ambos os campos (Email e Senha).";
        return;
    }

    fetch(`http://localhost:8080/usuarios/${emailDigitado}/${senhaDigitada}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    }
})
.then(response => {
    if (response.status === 404) {
        mensagem2.innerHTML = "Usuário não encontrado!";
    } else if (response.status === 200) {
        return response.json();  // Retorna o usuário em formato JSON
    } else {
        throw new Error("Erro ao verificar o usuário");
    }
})
.then(usuario => {
    if (usuario) {
        // Se o usuário foi encontrado e as credenciais estiverem corretas
        window.location.href = "/HTML/home.html";  // Redireciona para a home
    }
})
.catch(error => {
    mensagem2.innerHTML = "Erro ao verificar o usuário: " + error.message;
});
});

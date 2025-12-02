// ------------------- PREVIEW DA IMAGEM -------------------

document.getElementById("imageUpload").addEventListener("change", function () {

    // Pega arquivo enviado
    const file = this.files[0];

    // Seleciona tag <img>
    const preview = document.getElementById("preview");

    // Se tiver imagem...
    if (file) {
        preview.style.display = "block";              // Mostra preview
        preview.src = URL.createObjectURL(file);      // Converte para URL temporária
    }
});

// ------------------- PUBLICAR POST -------------------

document.getElementById("publishBtn").addEventListener("click", function () {

    const text = document.getElementById("postText").value;
    const fileInput = document.getElementById("imageUpload");
    const postsContainer = document.getElementById("posts");

    // Impede enviar vazio
    if (text.trim() === "" && fileInput.files.length === 0) {
        alert("Escreva algo ou escolha uma imagem.");
        return;
    }

    // Cria card de post
    const post = document.createElement("div");
    post.classList.add("post");

    // Monta o conteúdo
    let html = `<p>${text}</p>`;

    // Se tiver imagem
    if (fileInput.files.length > 0) {
        const imgURL = URL.createObjectURL(fileInput.files[0]);
        html += `<img src="${imgURL}">`;
    }

    // Botões de curtir e deletar
    html += `
        <div class="buttons">
            <span class="like-btn">♡</span>
            <span class="cancel-btn">✖</span>
        </div>
    `;

    post.innerHTML = html;

    // Insere no topo
    postsContainer.prepend(post);

    // Limpa campos
    document.getElementById("postText").value = "";
    fileInput.value = "";
    document.getElementById("preview").style.display = "none";

    // ------------------- CURTIR -------------------
    post.querySelector(".like-btn").addEventListener("click", function () {
        this.classList.toggle("liked");
        this.textContent = this.classList.contains("liked") ? "❤️" : "♡";
    });

    // ------------------- REMOVER POST -------------------
    post.querySelector(".cancel-btn").addEventListener("click", function () {
        post.remove();
    });

});
document.addEventListener("DOMContentLoaded", () => {
    const fundoSalvo = localStorage.getItem("backgroundImage");

    if (fundoSalvo) {
        document.body.style.backgroundImage = `url('${fundoSalvo}')`;
        document.body.style.backgroundPosition = "center";
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const fotoSalva = localStorage.getItem("fotoPerfil");
    const labelPreview = document.getElementById("previewFoto");

    if (fotoSalva) {
        labelPreview.style.backgroundImage = `url('${fotoSalva}')`;
        labelPreview.style.backgroundPosition = "center";
        labelPreview.style.backgroundSize = "cover";
    }
});
 // Cria um elemento para mostrar a data e hora da postagem
  const time = document.createElement('div');
  time.classList.add('post-time'); // Classe CSS para o estilo
  time.textContent = new Date().toLocaleString('pt-BR'); // Mostra data e hora no formato brasileiro
// Junta o texto e a hora dentro da div da potagem
//foto perfil
document.addEventListener("DOMContentLoaded", () => {
    const labelPreview = document.getElementById("previewFoto");
    const fotoSalvo= localStorage.getItem("fotoPerfil");

    if (fotoSalvo) {
        labelPreview.style.backgroundImage = `url('${fotoSalvo}')`;
        labelPreview.style.backgroundPosition = "center";
        labelPreview.style.backgroundSize = "cover";
    }
});
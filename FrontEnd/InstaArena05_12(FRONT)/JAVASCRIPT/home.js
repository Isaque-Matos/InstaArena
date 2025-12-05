// ------------------- PREVIEW DA IMAGEM -------------------
document.getElementById("imageUpload").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("preview");

    if (file) {
        preview.style.display = "block";
        preview.src = URL.createObjectURL(file);
    }
});


// ----------- Função para gerar ID único -----------
function gerarID() {
    return "post_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
}


// ------------------- ATIVAR EVENTOS -------------------
function ativarEventos(post, postID) {

    // CURTIR
    const likeBtn = post.querySelector(".like-btn");
    likeBtn.addEventListener("click", function () {

        const liked = this.classList.toggle("liked");
        this.textContent = "liked" ? "❤️" : "♡";

        let curtidos = JSON.parse(localStorage.getItem("postsCurtidos")) || [];

        if(liked){
            if (!curtidos.includes(postID)) {
            curtidos.push(postID);
            }
        } else {
            curtidos = curtidos.filter(id => id !== postID);
        }

        localStorage.setItem("postsCurtidos", JSON.stringify(curtidos));
    });

    // REMOVER
    const cancelBtn = post.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", function () {

        post.remove();

        let todos = JSON.parse(localStorage.getItem("postsSalvos")) || [];
        todos = todos.filter(p => p.id !== postID);
        localStorage.setItem("postsSalvos", JSON.stringify(todos));
    });
}



// ------------------- PUBLICAR POST -------------------
document.getElementById("publishBtn").addEventListener("click", function () {

    const text = document.getElementById("postText").value;
    const fileInput = document.getElementById("imageUpload");
    const postsContainer = document.getElementById("posts");

    if (text.trim() === "" && fileInput.files.length === 0) {
        alert("Escreva algo ou escolha uma imagem.");
        return;
    }

    // ID do post
    const postID = gerarID();

    // Criação do HTML
    const post = document.createElement("div");
    post.classList.add("post");
    post.dataset.id = postID;

    let html = `<p>${text}</p>`;

    if (fileInput.files.length > 0) {
        const imgURL = URL.createObjectURL(fileInput.files[0]);
        html += `<img src="${imgURL}">`;
    }

    html += `
        <div class="post-time">${new Date().toLocaleString("pt-BR")}</div>
        <div class="buttons">
            <span class="like-btn">♡</span>
            <span class="cancel-btn">✖</span>
        </div>
    `;

    post.innerHTML = html;

    postsContainer.prepend(post);

    // Limpar
    document.getElementById("postText").value = "";
    fileInput.value = "";
    document.getElementById("preview").style.display = "none";

    // Ativar eventos
    ativarEventos(post, postID);

    // SALVAR NO LOCALSTORAGE
    let todos = JSON.parse(localStorage.getItem("postsSalvos")) || [];
    todos.unshift({
        id: postID,
        html: post.innerHTML
    });
    localStorage.setItem("postsSalvos", JSON.stringify(todos));
});



// ------------------- CARREGAR AO INICIAR -------------------
document.addEventListener("DOMContentLoaded", () => {

    const fundoSalvo = localStorage.getItem("backgroundImage");
    if (fundoSalvo) {
        document.body.style.backgroundImage = `url('${fundoSalvo}')`;
    }

    const lista = JSON.parse(localStorage.getItem("postsSalvos")) || [];
    const likes = JSON.parse(localStorage.getItem("postsCurtidos")) || [];
    const postsContainer = document.getElementById("posts");

    lista.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("post");
        div.dataset.id = item.id;
        div.innerHTML = item.html;

        // restaura curtidas
        const likeBtn = div.querySelector(".like-btn");
        if (likes.includes(item.id)) {
            likeBtn.classList.add("liked");
            likeBtn.textContent = "❤️";
        }

        postsContainer.appendChild(div);

        ativarEventos(div, item.id);
    });
});

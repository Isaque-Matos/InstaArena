document.addEventListener("DOMContentLoaded", () => {
const PlanoDeFundo = document.getElementById("PlanoDeFundo");//pega o elemento
const fundoSalvo =localStorage.getItem("backgroundImage");
if (fundoSalvo){
    document.body.style.backgroundImage= `url('${fundoSalvo}')`;
    document.body.style.backgroundPosition= "center";
}
PlanoDeFundo.addEventListener("change", function(event)//quando manda o plano é adicionado
{
    const file = event.target.files[0];//pega o primeiro item
    if(file)//se tiver arquivo
    {
       const reader = new FileReader();//leitor de arquivo
       reader.onload = function(e) //quando arquivo for lido
       {
        const imagem =e.target.result;

        document.body.style.backgroundImage =`url('${imagem}')`;
        document.body.style.backgroundPosition= "center";
        localStorage.setItem("backgroundImage", imagem);
       } ;

       reader.readAsDataURL(file);//le o arquivo 
    }
});
});

document.addEventListener("DOMContentLoaded", () => {
    const inputFoto = document.getElementById("Foto");
    const labelPreview = document.getElementById("previewFoto");//pega o elemento
    const fotoSalvo =localStorage.getItem("FotoPerfil");
    if (fotoSalvo){
        labelPreview.style.backgroundImage= `url('${fotoSalvo}')`;
    }
    inputFoto.addEventListener("change", function(event)//quando manda o plano é adicionado
    {
        const file = event.target.files[0];//pega o primeiro item
        if(file)//se tiver arquivo
        {
           const reader = new FileReader();//leitor de arquivo
           reader.onload = function(e) //quando arquivo for lido
           {
            const imagem =e.target.result;
    
            labelPreview.style.backgroundImage =`url('${imagem}')`;
            localStorage.setItem("FotoPerfil", imagem); 
           } ;
           
           reader.readAsDataURL(file);//le o arquivo 
        }
    });
});
function addImage() {
    document.getElementById("fileInput").click();
}

// **MODIFICAÇÃO — carregar imagens salvas ao iniciar**
document.addEventListener("DOMContentLoaded", loadImages);

function addImage() {
    document.getElementById("fileInput").click();
}

document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const imgBase64 = e.target.result;

        // Mostra na tela
        addImageToGallery(imgBase64);

        // **MODIFICAÇÃO — salvar imagem no navegador**
        saveImage(imgBase64);
    };

    reader.readAsDataURL(file);
});

// Adiciona imagem na galeria
function addImageToGallery(src) {
    const img = document.createElement("img");
    img.src = src;
    document.getElementById("galeria").appendChild(img);
}

// **MODIFICAÇÃO — função para salvar no LocalStorage**
function saveImage(base64) {
    let images = JSON.parse(localStorage.getItem("galleryImages")) || [];
    images.push(base64);
    localStorage.setItem("galleryImages", JSON.stringify(images));
}

// **MODIFICAÇÃO — carregar imagens salvas ao abrir a página**
function loadImages() {
    let images = JSON.parse(localStorage.getItem("galleryImages")) || [];
    images.forEach(img => addImageToGallery(img));
}

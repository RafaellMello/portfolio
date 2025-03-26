// Seleciona todos os itens de portfólio
document.querySelectorAll('.portfolio-item').forEach(function(item) {
    // Para cada item de portfólio, seleciona o vídeo e adiciona os eventos de hover
    item.addEventListener('mouseenter', function() {
        const video = item.querySelector('.portfolio-banner-hover');
        video.play(); // Reproduz o vídeo quando o mouse entra
    });

    item.addEventListener('mouseleave', function() {
        const video = item.querySelector('.portfolio-banner-hover');
        video.pause(); // Pausa o vídeo quando o mouse sai
        video.currentTime = 0; // Reseta o vídeo para o início
    });
});

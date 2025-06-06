document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe "animate" quando o item entra na tela
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Para de observar após a animação
            }
        });
    }, {
        threshold: 0.5 // 50% do item precisa estar visível para disparar a animação
    });

    // Seleciona todos os itens de portfólio para observar
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        observer.observe(item); // Inicia a observação de cada item
    });
});

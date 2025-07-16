document.addEventListener("DOMContentLoaded", function () {
    // Para a seção de planos
    const planObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25
    });

    // Para os itens do portfólio
    const portfolioObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const planSection = document.querySelectorAll('.plans-section');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    planSection.forEach(section => planObserver.observe(section));
    portfolioItems.forEach(item => portfolioObserver.observe(item));
});

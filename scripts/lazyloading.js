document.addEventListener("DOMContentLoaded", function () {
    function makeObserver(threshold) {
        return new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: threshold });
    }

    var planObserver = makeObserver(0.25);
    var portfolioObserver = makeObserver(0.5);

    document.querySelectorAll('.plans-section').forEach(function(el) {
        planObserver.observe(el);
    });

    document.querySelectorAll('.portfolio-item').forEach(function(el) {
        portfolioObserver.observe(el);
    });
});

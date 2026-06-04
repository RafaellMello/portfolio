document.addEventListener('DOMContentLoaded', function () {
  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.portfolio-title, .portfolio-item').forEach(function (el) {
    observer.observe(el);
  });
});

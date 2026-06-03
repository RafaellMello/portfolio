document.querySelectorAll('.portfolio-item').forEach(function(item) {
    const video = item.querySelector('.portfolio-banner-hover');
    if (!video) return;

    item.addEventListener('mouseenter', function() {
        video.play();
    });

    item.addEventListener('mouseleave', function() {
        video.pause();
        video.currentTime = 0;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('carouselTrack');
    
    // Clone items for infinite scroll
    const originalItems = track.querySelector('div').children;
    Array.from(originalItems).forEach(item => {
        track.querySelector('div').appendChild(item.cloneNode(true));
    });
    
    let position = 0;
    const itemWidth = 150;//need fix
    const totalItems = originalItems.length;

    function moveCarousel() {
        position++;
        
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${position * itemWidth}px)`;

        if (position >= totalItems) {
            setTimeout(() => {
                track.style.transition = 'none';
                position = 0;
                track.style.transform = 'translateX(0)';
            }, 500);
        }
    }

    setInterval(moveCarousel, 3000);
});
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('slides-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const dotsContainer = document.getElementById('dots-container');

    const slides = Array.from(container.children);
    const totalSlides = slides.length;
    let currentIndex = 0;
    let timer;

    const setup = () => {
        container.appendChild(slides[0].cloneNode(true));
        container.insertBefore(slides[totalSlides - 1].cloneNode(true), slides[0]);
        updateSlide(100, false); 
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `w-3 h-3 rounded-full transition-all ${i === 0 ? 'bg-white' : 'bg-white hover:bg-white'}`;
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        });
    };

    const updateSlide = (offset, transition = true) => {
        container.style.transition = transition ? 'transform 500ms ease' : 'none';
        container.style.transform = `translateX(-${offset}%)`;

        Array.from(dotsContainer.children).forEach((dot, i) => {
            dot.className = `w-3 h-3 rounded-full transition-all ${i === currentIndex ? 'bg-white' : 'bg-white hover:bg-white'}`;
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        });
    };

    const slide = (direction) => {
        const isNext = direction === 'next';
        currentIndex = isNext ? currentIndex + 1 : currentIndex - 1;

        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
            updateSlide((totalSlides + 1) * 100, false);
            setTimeout(() => updateSlide(totalSlides * 100), 10);
        } else if (currentIndex >= totalSlides) {
            currentIndex = 0;
            updateSlide(0, false);
            setTimeout(() => updateSlide(100), 10);
        } else {
            updateSlide((currentIndex + 1) * 100);
        }

        resetTimer();
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSlide((currentIndex + 1) * 100);
        resetTimer();
    };

    const resetTimer = () => {
        clearInterval(timer);
        timer = setInterval(() => slide('next'), 5000);
    };

    prevButton.onclick = () => slide('prev');
    nextButton.onclick = () => slide('next');
    container.onmouseenter = () => clearInterval(timer);
    container.onmouseleave = resetTimer;
    document.onkeydown = (e) => {
        if (e.key === 'ArrowLeft') slide('prev');
        if (e.key === 'ArrowRight') slide('next');
    };

    setup();
    resetTimer();
});
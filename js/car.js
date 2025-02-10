document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        container: document.getElementById('slides-container'),
        prev: document.getElementById('prev-button'),
        next: document.getElementById('next-button'),
        dots: document.getElementById('dots-container')
    };

    const state = {
        slides: elements.container.children,
        current: 0,
        total: elements.container.children.length,
        timer: null
    };

    // Setup carousel
    const setup = () => {
        elements.container.appendChild(state.slides[0].cloneNode(true));
        elements.container.insertBefore(state.slides[state.total - 1].cloneNode(true), state.slides[0]);
        elements.container.style.transform = 'translateX(-100%)';
        
        // Create dots
        [...Array(state.total)].forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `w-3 h-3 rounded-full transition-all ${i === 0 ? 'bg-white' : 'bg-white/50 hover:bg-white'}`;
            dot.onclick = () => goTo(i);
            elements.dots.appendChild(dot);
        });
    };

    // Slide controls
    const updateSlide = (offset, transition = true) => {
        elements.container.style.transition = transition ? 'transform 500ms ease' : 'none';
        elements.container.style.transform = `translateX(-${offset}%)`;
        [...elements.dots.children].forEach((dot, i) => 
            dot.className = `w-3 h-3 rounded-full transition-all ${i === state.current ? 'bg-white' : 'bg-white/50 hover:bg-white'}`
        );
    };

    const slide = direction => {
        const isNext = direction === 'next';
        if (state.current === (isNext ? state.total - 1 : 0)) {
            state.current = isNext ? -1 : state.total;
            updateSlide(isNext ? 0 : (state.total + 1) * 100, false);
            setTimeout(() => {
                state.current = isNext ? 0 : state.total - 1;
                updateSlide((state.current + 1) * 100);
            }, 10);
        } else {
            state.current += isNext ? 1 : -1;
            updateSlide((state.current + 1) * 100);
        }
        clearInterval(state.timer);
        state.timer = setInterval(() => slide('next'), 5000);
    };

    const goTo = index => {
        state.current = index;
        updateSlide((state.current + 1) * 100);
        clearInterval(state.timer);
        state.timer = setInterval(() => slide('next'), 5000);
    };

    // Event listeners
    elements.prev.onclick = () => slide('prev');
    elements.next.onclick = () => slide('next');
    elements.container.onmouseenter = () => clearInterval(state.timer);
    elements.container.onmouseleave = () => state.timer = setInterval(() => slide('next'), 5000);
    document.onkeydown = e => e.key === 'ArrowLeft' ? slide('prev') : e.key === 'ArrowRight' ? slide('next') : null;

    // Initialize
    setup();
    state.timer = setInterval(() => slide('next'), 5000);
});

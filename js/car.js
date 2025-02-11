// car.js
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
        timer: null,
        isRTL: document.dir === 'rtl'
    };

    // Setup carousel
    const setup = () => {
        elements.container.appendChild(state.slides[0].cloneNode(true));
        elements.container.insertBefore(state.slides[state.total - 1].cloneNode(true), state.slides[0]);
        updateSlide(100, false); // Initial position
        
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
        // Adjust transform based on direction
        const translateValue = state.isRTL ? offset : -offset;
        elements.container.style.transform = `translateX(${translateValue}%)`;
        
        [...elements.dots.children].forEach((dot, i) => 
            dot.className = `w-3 h-3 rounded-full transition-all ${i === state.current ? 'bg-white' : 'bg-white/50 hover:bg-white'}`
        );
    };

    const slide = direction => {
        const isNext = direction === 'next';
        // Adjust direction for RTL
        const actualDirection = state.isRTL ? !isNext : isNext;

        if (state.current === (actualDirection ? state.total - 1 : 0)) {
            state.current = actualDirection ? -1 : state.total;
            updateSlide(actualDirection ? 0 : (state.total + 1) * 100, false);
            setTimeout(() => {
                state.current = actualDirection ? 0 : state.total - 1;
                updateSlide((state.current + 1) * 100);
            }, 10);
        } else {
            state.current += actualDirection ? 1 : -1;
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
    document.onkeydown = e => {
        // Adjust arrow keys for RTL
        if (state.isRTL) {
            if (e.key === 'ArrowLeft') slide('next');
            if (e.key === 'ArrowRight') slide('prev');
        } else {
            if (e.key === 'ArrowLeft') slide('prev');
            if (e.key === 'ArrowRight') slide('next');
        }
    };

    // Listen for direction changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'dir') {
                state.isRTL = document.dir === 'rtl';
                updateSlide((state.current + 1) * 100, false);
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['dir']
    });

    // Initialize
    setup();
    state.timer = setInterval(() => slide('next'), 5000);
});
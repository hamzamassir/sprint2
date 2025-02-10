document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.flex.justify-center button');
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active state from all dots
            dots.forEach(d => {
                d.classList.remove('bg-orange-500');
                d.classList.add('bg-blue-900');
            });
            
            // Add active state to clicked dot
            dot.classList.remove('bg-blue-900');
            dot.classList.add('bg-orange-500');
        });
    });
});

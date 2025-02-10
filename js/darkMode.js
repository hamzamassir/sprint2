// src/js/darkMode.js

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Function to toggle dark mode
    function toggleDarkMode() {
        // Toggle the class
        document.documentElement.classList.toggle('dark');
        
        // Save the preference
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('dark', isDark);
        
        // Optional: Log the state for debugging
        console.log('Dark mode:', isDark);
    }

    // Add click event listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Optional: Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('dark')) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    });
});
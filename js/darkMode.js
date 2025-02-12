document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    function toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
        
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('dark', isDark);
        
        //console.log('Dark mode:', isDark);
    }
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

});
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
if (
    localStorage.getItem("dark") === "true" || (!("dark" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

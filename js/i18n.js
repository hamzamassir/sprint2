document.addEventListener('DOMContentLoaded', function() {
    // Initialize i18next
    i18next.init({
        resources: resources, // from translations.js
        lng: localStorage.getItem('language') || 'en', // default language
        fallbackLng: 'en',
    }, function(err, t) {
        if (err) return console.error('i18next error:', err);
        updateContent();
    });

    // Language toggle functionality
    const languageToggle = document.getElementById('languageToggle');
    const currentLang = document.getElementById('currentLang');

    if (languageToggle && currentLang) {
        // Set initial language display
        currentLang.textContent = (localStorage.getItem('language') || 'en').toUpperCase();

        languageToggle.addEventListener('click', () => {
            const newLang = i18next.language === 'en' ? 'ar' : 'en';
            
            // Change language
            i18next.changeLanguage(newLang, (err) => {
                if (err) return console.error('Language change error:', err);
                
                // Update UI
                currentLang.textContent = newLang.toUpperCase();
                document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
                localStorage.setItem('language', newLang);
                updateContent();
            });
        });
    }
});

// Update content function
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    i18next.init({
        resources: resources,
        lng: localStorage.getItem('language') || 'en',
        fallbackLng: 'en',
    }, function(err, t) {
        if (err) return console.error('i18next error:', err);
        updateContent();
    });
    const languageToggle = document.getElementById('languageToggle');
    const currentLang = document.getElementById('currentLang');

    if (languageToggle && currentLang) {
        currentLang.textContent = (localStorage.getItem('language') || 'en').toUpperCase();

        languageToggle.addEventListener('click', () => {
            const newLang = i18next.language === 'en' ? 'ar' : 'en';
            i18next.changeLanguage(newLang, (err) => {
                if (err) return console.error('Language change error:', err);
                currentLang.textContent = newLang.toUpperCase();
                document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
                localStorage.setItem('language', newLang);
                updateContent();
            });
        });
    }
});
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
}
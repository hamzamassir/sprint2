document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const contentContainer = document.getElementById('contentContainer');
    let isExpanded = false;

    showMoreBtn.addEventListener('click', function() {
        if (!isExpanded) {
            const additionalContent = `
                <p class="text-gray-700  text-lg mx-auto dark:text-gray-300 additional-content" data-i18n="showMore.paragraph1"></p>
                <p class="text-gray-700  text-lg mx-auto dark:text-gray-300 additional-content" data-i18n="showMore.paragraph2"></p>
                <p class="text-gray-700  text-lg mx-auto dark:text-gray-300 additional-content" data-i18n="showMore.paragraph3"></p>
            `;
            contentContainer.insertAdjacentHTML('beforeend', additionalContent);
            
            i18next.reloadResources().then(() => {
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    element.textContent = i18next.t(key);
                });
            });

            showMoreBtn.setAttribute('data-i18n', 'showMore.hideButton');
        } else {
            document.querySelectorAll('.additional-content').forEach(p => p.remove());
            showMoreBtn.setAttribute('data-i18n', 'showMore.button');
        }
        showMoreBtn.textContent = i18next.t(showMoreBtn.getAttribute('data-i18n'));
        isExpanded = !isExpanded;
    });
});
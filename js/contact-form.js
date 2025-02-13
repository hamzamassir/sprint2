document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const fields = form.querySelectorAll('input, textarea, select');

    // Validation Configuration
    const validationRules = {
        firstName: { required: true, minLength: 2, pattern: /^[a-zA-Z\s]*$/ },
        lastName: { required: true, minLength: 2, pattern: /^[a-zA-Z\s]*$/ },
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, 
        subject: { required: true },
        message: { required: true, minLength: 10 },
        terms: { required: true }
    };

    const showError = (field, errorKey) => {
        const errorElement = form.querySelector(`.${field.name}`);
        field.classList.add('border-red-500');
        errorElement.classList.remove('hidden');
    };

    const hideError = field => {
        const errorElement = form.querySelector(`.${field.name}`);
        field.classList.remove('border-red-500');
        errorElement.classList.add('hidden');
    };

    // Core Validation Logic
    const validateField = field => {
        const rules = validationRules[field.name];
        if (!rules) return true;
        
        hideError(field);
        let isValid = true;

        if (rules.required) {
            if (field.type === 'checkbox' ? !field.checked : !field.value.trim()) {
                showError(field, 'required');
                isValid = false;
            }
        }

        if (isValid && rules.minLength && field.value.length < rules.minLength) {
            showError(field, 'minLength');
            isValid = false;
        }

        if (isValid && rules.pattern && !rules.pattern.test(field.value)) {
            showError(field, 'pattern');
            isValid = false;
        }

        return isValid;
    };

    fields.forEach(field => {
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        const validationResults = Array.from(fields).map(field => validateField(field));
        const isValid = validationResults.every(result => result);

        if (!isValid) {
            errorMessage.classList.remove('hidden');
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            successMessage.classList.remove('hidden');
            form.reset();
        } catch (error) {
            errorMessage.classList.remove('hidden');
        }
    });
});
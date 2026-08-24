document.addEventListener('DOMContentLoaded', () => {
    // Language Toggle Logic
    const toggleBtn = document.getElementById('lang-toggle');
    const body = document.body;
    
    // Check local storage for preference, default to false (ID)
    let isEnglish = localStorage.getItem('pindai_lang_en') === 'true';
    
    // Apply initial state
    if (isEnglish) {
        body.classList.add('show-en');
    }

    toggleBtn.addEventListener('click', () => {
        isEnglish = !isEnglish;
        body.classList.toggle('show-en', isEnglish);
        localStorage.setItem('pindai_lang_en', isEnglish);
    });

    // Simple sticky nav style adjustment on scroll (optional enhancement)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});

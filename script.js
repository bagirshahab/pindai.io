document.addEventListener('DOMContentLoaded', () => {
    /* ---------- 1. Smart Multi-Language Switcher (ID / EN / TH) ---------- */
    
    // Check if the English class (.lang-en) exists on this page
    const hasEnglish = document.querySelector('.lang-en') !== null;
    
    // Define language toggle sequence (cycle through 3 languages if English is present, otherwise 2)
    const availableLangs = hasEnglish ? ['id', 'en', 'th'] : ['id', 'th'];

    // Find language toggle button (supports id="lang-toggle", id="lang-toggle-btn", or text content matching)
    let toggleBtn = document.getElementById('lang-toggle') || document.getElementById('lang-toggle-btn');
    if (!toggleBtn) {
        const allElements = document.querySelectorAll('button, div, a, span');
        for (let el of allElements) {
            if (el.children.length === 0 && el.textContent.trim().includes('ID')) {
                toggleBtn = el;
                break;
            }
        }
    }

    // Function to update page display based on selected language
    const applyLanguage = (lang) => {
        // Fallback to Indonesian if user previously chose English, but current page lacks English content
        if (lang === 'en' && !hasEnglish) {
            lang = 'id';
        }

        const body = document.body;
        body.classList.remove('show-en', 'show-th'); // Clear previous classes first
        
        if (lang === 'en') body.classList.add('show-en');
        if (lang === 'th') body.classList.add('show-th');
        
        localStorage.setItem('pindai_lang', lang);
    };

    // --- Initial Page Load ---
    // Retrieve saved language setting; default to 'id' if none exists
    let savedLang = localStorage.getItem('pindai_lang');
    if (!savedLang) {
        const oldEn = localStorage.getItem('pindai_lang_en'); // Backward compatibility for legacy cache
        savedLang = (oldEn === 'true') ? 'en' : 'id';
    }
    applyLanguage(savedLang);

    // --- On Language Toggle Click ---
    if (toggleBtn) {
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Read currently active language
            let currentLang = localStorage.getItem('pindai_lang') || 'id';
            let currentIndex = availableLangs.indexOf(currentLang);
            if (currentIndex === -1) currentIndex = 0;
            
            // Determine next language in sequence (looping around)
            let nextIndex = (currentIndex + 1) % availableLangs.length;
            let nextLang = availableLangs[nextIndex];
            
            // Apply selected language
            applyLanguage(nextLang);
        });
    }

    /* ---------- 2. Simple sticky nav style adjustment on scroll ---------- */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }
});
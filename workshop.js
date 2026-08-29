document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Tabs Navigation ---------- */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Function to activate selected tab button and corresponding panel
    function activateTab(target) {
        tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === target));
        tabPanels.forEach(p => p.classList.toggle('active', p.id === target));
    }

    // Add click listeners to all tab buttons with smooth scroll
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activateTab(btn.dataset.tab);
            const panel = document.getElementById(btn.dataset.tab);
            if (panel) {
                window.scrollTo({ top: panel.offsetTop - 150, behavior: 'smooth' });
            }
        });
    });

    /* ---------- Jury Tab Shortcut ("Return to Tutorial") ---------- */
    const hideJuryBtn = document.getElementById('hide-jury-inline');
    if (hideJuryBtn) {
        hideJuryBtn.addEventListener('click', () => {
            activateTab('tab-app');
            const targetPanel = document.getElementById('tab-app');
            if (targetPanel) {
                window.scrollTo({ top: targetPanel.offsetTop - 150, behavior: 'smooth' });
            }
        });
    }

    /* ---------- Accordion Functionality ---------- */
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');
            const isOpen = item.classList.contains('open');

            // Close other accordion items within the same group
            document.querySelectorAll('.accordion-item').forEach(other => {
                if (other !== item && other.closest('.accordion-group') === item.closest('.accordion-group')) {
                    other.classList.remove('open');
                    other.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current accordion state
            item.classList.toggle('open', !isOpen);
            content.style.maxHeight = !isOpen ? content.scrollHeight + 'px' : null;
        });
    });

    /* ---------- Sub-navigation Scroll Highlighting ---------- */
    const subnavLinks = document.querySelectorAll('.subnav a');
    const sections = Array.from(subnavLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

    // Highlight active sub-nav item based on current scroll position
    function highlightSubnav() {
        let currentIndex = 0;
        sections.forEach((sec, i) => {
            if (sec.getBoundingClientRect().top - 160 <= 0) currentIndex = i;
        });
        subnavLinks.forEach((a, i) => a.classList.toggle('active', i === currentIndex));
    }

    window.addEventListener('scroll', highlightSubnav);
    highlightSubnav();

    /* ---------- Apple Freshness Interactive Demo ---------- */
    const slider = document.getElementById('apple-slider');
    if (slider) {
        const valueLabel = document.getElementById('apple-value');
        const resultLabel = document.getElementById('apple-result');
        const emoji = document.getElementById('apple-emoji');

        // Update UI based on slider value and current language state
        function updateApple() {
            const val = parseInt(slider.value, 10);
            const isThai = document.body.classList.contains('show-th');
            
            valueLabel.textContent = val + '%';
            if (val >= 55) {
                resultLabel.textContent = isThai ? 'สด ✅' : 'Segar ✅';
                resultLabel.style.color = '#22C55E';
                emoji.textContent = '🍏';
            } else {
                resultLabel.textContent = isThai ? 'เน่า ❌' : 'Busuk ❌';
                resultLabel.style.color = '#EF4444';
                emoji.textContent = '🍎';
            }
        }

        slider.addEventListener('input', updateApple);
        updateApple();

        // Listen for language changes to update demo labels instantly
        const langBtn = document.getElementById('lang-toggle-btn') || document.getElementById('lang-toggle');
        if (langBtn) {
            langBtn.addEventListener('click', updateApple);
        }
    }
});
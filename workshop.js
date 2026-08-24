document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Tabs ---------- */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function activateTab(target) {
        tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === target));
        tabPanels.forEach(p => p.classList.toggle('active', p.id === target));
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activateTab(btn.dataset.tab);
            const panel = document.getElementById(btn.dataset.tab);
            if (panel) {
                window.scrollTo({ top: panel.offsetTop - 150, behavior: 'smooth' });
            }
        });
    });

    /* ---------- Jury tab: "return to tutorial" shortcut ---------- */
    const hideJuryBtn = document.getElementById('hide-jury-inline');
    if (hideJuryBtn) {
        hideJuryBtn.addEventListener('click', () => {
            activateTab('tab-app');
            window.scrollTo({ top: document.getElementById('tab-app').offsetTop - 150, behavior: 'smooth' });
        });
    }

    /* ---------- Accordions ---------- */
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.accordion-item').forEach(other => {
                if (other !== item && other.closest('.accordion-group') === item.closest('.accordion-group')) {
                    other.classList.remove('open');
                    other.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            item.classList.toggle('open', !isOpen);
            content.style.maxHeight = !isOpen ? content.scrollHeight + 'px' : null;
        });
    });

    /* ---------- Sub-nav active state on scroll ---------- */
    const subnavLinks = document.querySelectorAll('.subnav a');
    const sections = Array.from(subnavLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

    function highlightSubnav() {
        let currentIndex = 0;
        sections.forEach((sec, i) => {
            if (sec.getBoundingClientRect().top - 160 <= 0) currentIndex = i;
        });
        subnavLinks.forEach((a, i) => a.classList.toggle('active', i === currentIndex));
    }
    window.addEventListener('scroll', highlightSubnav);
    highlightSubnav();

    /* ---------- Apple freshness interactive demo ---------- */
    const slider = document.getElementById('apple-slider');
    if (slider) {
        const valueLabel = document.getElementById('apple-value');
        const resultLabel = document.getElementById('apple-result');
        const emoji = document.getElementById('apple-emoji');

        function updateApple() {
            const val = parseInt(slider.value, 10);
            valueLabel.textContent = val + '%';
            if (val >= 55) {
                resultLabel.textContent = 'Segar ✅';
                resultLabel.style.color = '#22C55E';
                emoji.textContent = '🍏';
            } else {
                resultLabel.textContent = 'Busuk ❌';
                resultLabel.style.color = '#EF4444';
                emoji.textContent = '🍎';
            }
        }
        slider.addEventListener('input', updateApple);
        updateApple();
    }
});

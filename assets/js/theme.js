var ToolBoxTheme = (function() {
    var themes = [
        { name: 'blue', primary: '#2563eb', light: '#eff6ff', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', headerBg: 'rgba(239,246,255,0.92)', shadow: 'rgba(37,99,235,0.3)', bg: '#f0f4ff', cardBg: '#f8faff' },
        { name: 'purple', primary: '#7c3aed', light: '#f5f3ff', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)', headerBg: 'rgba(245,243,255,0.92)', shadow: 'rgba(124,58,237,0.3)', bg: '#f5f3ff', cardBg: '#faf8ff' },
        { name: 'green', primary: '#10b981', light: '#ecfdf5', gradient: 'linear-gradient(135deg, #14b8a6 0%, #22c55e 100%)', headerBg: 'rgba(236,253,245,0.92)', shadow: 'rgba(16,185,129,0.3)', bg: '#ecfdf5', cardBg: '#f4faf7' },
        { name: 'orange', primary: '#f97316', light: '#fff7ed', gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)', headerBg: 'rgba(255,247,237,0.92)', shadow: 'rgba(249,115,22,0.3)', bg: '#fff7ed', cardBg: '#fffbf5' },
        { name: 'pink', primary: '#ec4899', light: '#fdf2f8', gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)', headerBg: 'rgba(253,242,248,0.92)', shadow: 'rgba(236,72,153,0.3)', bg: '#fdf2f8', cardBg: '#fef6fa' }
    ];

    function adjustBrightness(hex, percent) {
        var num = parseInt(hex.replace('#', ''), 16);
        var amt = Math.round(2.55 * percent);
        var R = (num >> 16) + amt;
        var G = (num >> 8 & 0x00FF) + amt;
        var B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }

    function applyTheme(theme) {
        var root = document.documentElement;
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--primary-light', theme.light);
        root.style.setProperty('--primary-hover', adjustBrightness(theme.primary, -10));
        root.style.setProperty('--header-bg', theme.headerBg);
        root.style.setProperty('--primary-shadow', theme.shadow);
        root.style.setProperty('--bg', theme.bg);
        root.style.setProperty('--card-bg', theme.cardBg);

        var hero = document.querySelector('.hero');
        if (hero) {
            hero.style.background = theme.gradient;
        }
    }

    function getSavedIndex() {
        try {
            var saved = localStorage.getItem('themeIndex');
            if (saved !== null) return parseInt(saved);
        } catch(e) {}
        return 0;
    }

    function applyFromStorage() {
        var idx = getSavedIndex();
        if (idx > 0 && idx < themes.length) {
            applyTheme(themes[idx]);
        }
    }

    function setupToggle() {
        var currentTheme = getSavedIndex();
        var toggleBtn = document.getElementById('themeToggle');
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', function() {
            currentTheme = (currentTheme + 1) % themes.length;
            applyTheme(themes[currentTheme]);
            try {
                localStorage.setItem('themeIndex', currentTheme.toString());
            } catch(e) {}

            var icon = this.querySelector('.theme-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                setTimeout(function() {
                    icon.style.transform = 'rotate(0deg)';
                }, 300);
            }
        });

        if (currentTheme !== 0) {
            applyTheme(themes[currentTheme]);
        }
    }

    return {
        applyFromStorage: applyFromStorage,
        setupToggle: setupToggle,
        applyTheme: applyTheme,
        getThemes: function() { return themes; },
        getSavedIndex: getSavedIndex
    };
})();

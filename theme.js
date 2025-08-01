function getThemeKey(scope) {
    return scope === 'bricks' ? 'bricksTheme' : 'theme';
}
function getAccentKey(scope) {
    return scope === 'bricks' ? 'bricksNeonAccent' : 'neonAccent';
}

function setTheme(theme, scope = 'main') {
    document.documentElement.className = '';
    document.documentElement.classList.add('theme-' + theme);
    if (theme === 'neon') {
        const accent = localStorage.getItem(getAccentKey(scope)) || '#39ff14,#232b25';
        const [color, bg] = accent.split(',');
        document.documentElement.style.setProperty('--neon-accent', color);
        document.documentElement.style.setProperty('--neon-bg', bg);
    }
}

function setAccent(accent, scope = 'main') {
    const [color, bg] = accent.split(',');
    document.documentElement.style.setProperty('--neon-accent', color);
    document.documentElement.style.setProperty('--neon-bg', bg);
    localStorage.setItem(getAccentKey(scope), accent);
    window.dispatchEvent(new Event('storage'));
}

function initTheme(scope = 'main') {
    const themeKey = getThemeKey(scope);
    const accentKey = getAccentKey(scope);
    const savedTheme = localStorage.getItem(themeKey) || 'night';
    setTheme(savedTheme, scope);
    if (savedTheme === 'neon') {
        const accent = localStorage.getItem(accentKey) || '#39ff14,#232b25';
        setAccent(accent, scope);
    }
}

window.addEventListener('storage', function(e) {
    if ((e.key === 'theme' || e.key === 'neonAccent') && window.themeScope === 'main') {
        initTheme('main');
    }
    if ((e.key === 'bricksTheme' || e.key === 'bricksNeonAccent') && window.themeScope === 'bricks') {
        initTheme('bricks');
    }
});
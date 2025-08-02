
// Function to get the correct localStorage key for a given scope
function getThemeKey(scope) {
    return scope + 'Theme';
}

function getAccentKey(scope) {
    return scope + 'NeonAccent';
}

// Function to set the theme on the <html> element
function setTheme(themeName, scope) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem(getThemeKey(scope), themeName);
    if (themeName === 'neon') {
        // Apply neon accent if theme is neon
        const accent = localStorage.getItem(getAccentKey(scope)) || '#39ff14,#232b25';
        setAccentVariables(accent);
    }
}

// Helper to set the neon accent CSS variables
function setAccentVariables(accent) {
    const [color, bg] = accent.split(',');
    document.documentElement.style.setProperty('--neon-accent', color);
    document.documentElement.style.setProperty('--neon-bg', bg);
}

// Function to set the neon accent and save it to localStorage
function setAccent(accent, scope) {
    setAccentVariables(accent);
    localStorage.setItem(getAccentKey(scope), accent);
}

// Function to initialize the theme when a page loads
function initTheme(scope) {
    const savedTheme = localStorage.getItem(getThemeKey(scope)) || 'night';
    setTheme(savedTheme, scope);
    // Note: The accent is now handled by setTheme for consistency
}

// Event listener to sync theme changes across tabs
window.addEventListener('storage', function (e) {
    // Check if the change is relevant to the current page's scope
    const themeKey = getThemeKey(window.themeScope);
    const accentKey = getAccentKey(window.themeScope);
    if (e.key === themeKey) {
        setTheme(localStorage.getItem(e.key), window.themeScope);
    } else if (e.key === accentKey) {
        setAccent(localStorage.getItem(e.key), window.themeScope);
    }
});

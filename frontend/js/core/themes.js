// Multiple Theme System
class ThemeManager {
    constructor() {
        this.themes = {
            default: {
                name: 'AWS Orange',
                colors: {
                    primary: '#FF9900',
                    primaryDark: '#ec7211',
                    primaryLight: '#ffb84d',
                    secondary: '#232F3E',
                    accent: '#146EB4'
                }
            },
            azure: {
                name: 'Azure Blue',
                colors: {
                    primary: '#0078D4',
                    primaryDark: '#005a9e',
                    primaryLight: '#50a0e8',
                    secondary: '#003366',
                    accent: '#00BCF2'
                }
            },
            gcp: {
                name: 'GCP Red',
                colors: {
                    primary: '#EA4335',
                    primaryDark: '#c5221f',
                    primaryLight: '#ef7567',
                    secondary: '#202124',
                    accent: '#4285F4'
                }
            },
            github: {
                name: 'GitHub Dark',
                colors: {
                    primary: '#58a6ff',
                    primaryDark: '#1f6feb',
                    primaryLight: '#79c0ff',
                    secondary: '#0d1117',
                    accent: '#238636'
                }
            },
            sunset: {
                name: 'Sunset',
                colors: {
                    primary: '#FF6B6B',
                    primaryDark: '#ee5a52',
                    primaryLight: '#ff8787',
                    secondary: '#2c3e50',
                    accent: '#FFA07A'
                }
            },
            nature: {
                name: 'Nature Green',
                colors: {
                    primary: '#27ae60',
                    primaryDark: '#1e8449',
                    primaryLight: '#52be80',
                    secondary: '#34495e',
                    accent: '#3498db'
                }
            },
            purple: {
                name: 'Purple Dream',
                colors: {
                    primary: '#9b59b6',
                    primaryDark: '#8e44ad',
                    primaryLight: '#bb8fce',
                    secondary: '#2c3e50',
                    accent: '#e74c3c'
                }
            },
            ocean: {
                name: 'Ocean Blue',
                colors: {
                    primary: '#3498db',
                    primaryDark: '#2980b9',
                    primaryLight: '#5dade2',
                    secondary: '#1c2833',
                    accent: '#1abc9c'
                }
            }
        };

        this.currentTheme = localStorage.getItem('colorTheme') || 'default';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createThemeSwitcher();
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}-color`;
            root.style.setProperty(cssVar, value);
        });

        this.currentTheme = themeName;
        localStorage.setItem('colorTheme', themeName);

        // Update meta theme-color
        let metaTheme = document.querySelector('meta[name="theme-color"]');
        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.name = 'theme-color';
            document.head.appendChild(metaTheme);
        }
        metaTheme.content = theme.colors.primary;

        // Dispatch event
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: themeName } }));
    }

    createThemeSwitcher() {
        // Check if theme switcher already exists
        if (document.getElementById('themeSwitcherModal')) return;

        const modal = document.createElement('div');
        modal.id = 'themeSwitcherModal';
        modal.className = 'theme-modal';
        modal.innerHTML = `
            <div class="theme-modal-content">
                <div class="theme-modal-header">
                    <h3><i class="fas fa-palette"></i> Choose Your Theme</h3>
                    <button class="theme-modal-close" id="themeModalClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="theme-grid">
                    ${Object.entries(this.themes).map(([key, theme]) => `
                        <button class="theme-option ${key === this.currentTheme ? 'active' : ''}"
                                data-theme="${key}">
                            <div class="theme-preview" style="background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})"></div>
                            <span class="theme-name">${theme.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelectorAll('.theme-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const themeName = button.getAttribute('data-theme');
                this.applyTheme(themeName);

                // Update active state
                modal.querySelectorAll('.theme-option').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Close modal after short delay
                setTimeout(() => this.closeModal(), 300);
            });
        });

        document.getElementById('themeModalClose').addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        // Create theme toggle button in navbar
        this.createThemeToggleButton();
    }

    createThemeToggleButton() {
        const nav = document.querySelector('.nav-menu');
        if (!nav) return;

        // Check if button already exists
        if (document.getElementById('themeToggleBtn')) return;

        const themeBtn = document.createElement('li');
        themeBtn.innerHTML = `
            <button id="themeToggleBtn" class="theme-toggle-btn" aria-label="Change theme">
                <i class="fas fa-palette"></i>
            </button>
        `;

        // Insert before the dark mode toggle
        const darkModeToggle = nav.querySelector('.theme-toggle');
        if (darkModeToggle && darkModeToggle.parentElement) {
            darkModeToggle.parentElement.parentElement.insertBefore(themeBtn, darkModeToggle.parentElement);
        } else {
            nav.appendChild(themeBtn);
        }

        document.getElementById('themeToggleBtn').addEventListener('click', () => this.openModal());
    }

    openModal() {
        const modal = document.getElementById('themeSwitcherModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('themeSwitcherModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    getTheme() {
        return this.currentTheme;
    }

    getThemeColors() {
        return this.themes[this.currentTheme].colors;
    }
}

// Initialize theme manager
let themeManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeManager = new ThemeManager();
    });
} else {
    themeManager = new ThemeManager();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}

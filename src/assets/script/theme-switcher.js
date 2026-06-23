class ThemeSwitcher extends HTMLElement {
  constructor() {
    super();

    const theme = localStorage.getItem('theme');
    if (theme) {
      this.applyTheme(theme);
    }
  }

  connectedCallback() {
    const buttons = this.querySelectorAll('[data-theme]');
    if (buttons.length === 0) return;

    const currentTheme = this.getCurrentTheme();
    this.setActiveButton(buttons, currentTheme);

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const chosenTheme = button.dataset.theme;
        if (chosenTheme) {
          this.setTheme(chosenTheme);
          this.setActiveButton(buttons, chosenTheme);
        }
      });
    });
  }

  applyTheme(theme) {
    const html = document.documentElement;
    html.classList.remove('theme-dark', 'theme-light');
    if (theme === 'dark' || theme === 'light') {
      html.classList.add(`theme-${theme}`);
    }
  }

  setTheme(theme) {
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  getCurrentTheme() {
    const html = document.documentElement;
    if (html.classList.contains('theme-dark')) return 'dark';
    if (html.classList.contains('theme-light')) return 'light';
    return 'auto';
  }

  setActiveButton(buttons, theme) {
    buttons.forEach(button => {
    const svg = button.querySelector('svg');
      if (svg) {
        svg.classList.remove('C-$brand');
      }
      button.removeAttribute('disabled');
    });

    const activeBtn = Array.from(buttons).find(btn => btn.dataset.theme === theme);
      if (activeBtn) {
        const activeSvg = activeBtn.querySelector('svg');
        if (activeSvg) {
          activeSvg.classList.add('C-$brand');
        }
        activeBtn.setAttribute('disabled', 'true');
      }
  }
}

customElements.define('theme-switcher', ThemeSwitcher);
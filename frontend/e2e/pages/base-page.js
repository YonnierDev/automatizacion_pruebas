/**
 * Página base que contiene funcionalidad común para todas las páginas
 */
export default class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Instancia de la página de Playwright
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navega a una URL relativa
   * @param {string} path - Ruta relativa a la que navegar
   */
  async navigateTo(path = '') {
    const url = new URL(path, this.page.url()).toString();
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  /**
   * Espera a que la página termine de cargar
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Obtiene el texto de un elemento
   * @param {string} selector - Selector del elemento
   * @returns {Promise<string>} Texto del elemento
   */
  async getText(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    return this.page.textContent(selector);
  }

  /**
   * Escribe texto en un input
   * @param {string} selector - Selector del input
   * @param {string} text - Texto a escribir
   */
  async type(selector, text) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.fill(selector, text);
  }

  /**
   * Hace clic en un elemento
   * @param {string} selector - Selector del elemento
   */
  async click(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.click(selector);
  }

  /**
   * Espera a que un elemento sea visible
   * @param {string} selector - Selector del elemento
   * @param {number} [timeout=10000] - Tiempo máximo de espera en ms
   */
  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { 
      state: 'visible',
      timeout
    });
  }

  /**
   * Toma una captura de pantalla
   * @param {string} name - Nombre del archivo de la captura
   */
  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}-${new Date().toISOString().replace(/[:.]/g, '-')}.png`,
      fullPage: true
    });
  }
}

import './copyrights.css';

export default class Copyrights {
  constructor() {
    this.element = document.createElement('address');
    this.element.classList.add('copyrights');

    this.link = document.createElement('a');
    this.link.classList.add('copyrights__link');
    this.link.href = 'https://github.com/ilya1981/cards';
    this.link.textContent = '© Shahmatov Ilya';

    this.element.append(this.link);
  }

  checkRights() {
    if (this.element.textContent !== '© Professor-Severus-Snape, 2024') {
      // eslint-disable-next-line no-console
      console.warn('This work has been stolen from https://github.com/ilya1981/cards');
    }
  }
}

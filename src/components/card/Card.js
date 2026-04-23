import './card.css';

// <li class="cards__item">
//   <span class="cards__text">Welcome to Trello!</span>
//   <span class="remove-btn hidden"></span>
// </li>
export default class Card {
  constructor(message) {
    this.element = document.createElement('li');
    this.element.classList.add('cards__item');

    this.text = document.createElement('span');
    this.text.classList.add('cards__text');
    this.text.textContent = message;

    this.removeBtn = document.createElement('span');
    this.removeBtn.classList.add('remove-btn', 'hidden');

    this.element.append(this.text, this.removeBtn);

    this.onMouseEnterHandler = this.onMouseEnter.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeave.bind(this);
    this.onRemoveBtnClickHandler = this.onRemoveBtnClick.bind(this);

    this.addListeners();
  }

  addListeners() {
    this.element.addEventListener('mouseenter', this.onMouseEnterHandler);
    this.element.addEventListener('mouseleave', this.onMouseLeaveHandler);
    this.removeBtn.addEventListener('click', this.onRemoveBtnClickHandler);
  }

  removeListeners() {
    this.element.removeEventListener('mouseenter', this.onMouseEnterHandler);
    this.element.removeEventListener('mouseleave', this.onMouseLeaveHandler);
    this.removeBtn.removeEventListener('click', this.onRemoveBtnClickHandler);
  }

  addCard(parentSelector) {
    const parentElement = document.querySelector(parentSelector);
    parentElement.append(this.element);
  }

  onMouseEnter() {
    this.removeBtn.classList.remove('hidden');
  }

  onMouseLeave() {
    this.removeBtn.classList.add('hidden');
  }

  onRemoveBtnClick() {
    this.removeListeners();
    this.element.remove();
  }
}

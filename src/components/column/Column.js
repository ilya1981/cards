import './column.css';

import Card from '../card/Card';
import Form from '../form/Form';

// <div class="column" data-title="todo">
//   <header class="header">
//     <h3 class="header__title">TODO</h3>
//     <div class="menu">
//       <span class="menu__dot"></span>
//       <span class="menu__dot"></span>
//       <span class="menu__dot"></span>
//     </div>
//   </header>
//   <ul class="cards">
//     <li class="cards__item">Welcome to Trello!</li>
//     <li class="cards__item">This is a card.</li>
//     <li class="cards__item">Click on a card to see whats's behind it.</li>
//     <li class="cards__item">You can attach pictures and files...</li>
//     <li class="cards__item">... any kind of hyperlink ...</li>
//     <li class="cards__item">... or checklists.</li>
//   </ul>
//   <button class="column__button" type="button">+ Add another card</button>
// </div>
export default class Column {
  constructor(title, dataAttribute) {
    this.element = document.createElement('div');
    this.element.classList.add('column');
    this.element.dataset.title = dataAttribute;

    this.header = document.createElement('header');
    this.header.classList.add('header');

    this.title = document.createElement('h3');
    this.title.classList.add('header__title');
    this.title.textContent = title;

    this.menu = document.createElement('div');
    this.menu.classList.add('menu');

    for (let i = 0; i < 3; i += 1) {
      const dot = document.createElement('span');
      dot.classList.add('menu__dot');
      this.menu.append(dot);
    }

    this.header.append(this.title, this.menu);

    this.list = document.createElement('ul');
    this.list.classList.add('cards');

    this.button = document.createElement('button');
    this.button.classList.add('column__button');
    this.button.type = 'button';
    this.button.textContent = '+ Add another card';

    this.element.append(this.header, this.header, this.list, this.button);

    this.addListeners();
  }

  addListeners() {
    this.button.addEventListener('click', this.onOpenForm.bind(this));
  }

  render(parentSelector, data) {
    this.parentElement = document.querySelector(parentSelector);
    this.parentElement.append(this.element);

    const attribute = this.element.dataset.title;
    const messages = data[attribute];

    for (let i = 0; i < messages.length; i += 1) {
      const card = new Card(messages[i]);
      card.addCard(`[data-title="${attribute}"] .cards`);
    }

    this.form = new Form();
    this.form.render(`[data-title="${attribute}"] .cards`);
  }

  onOpenForm() {
    this.button.classList.add('hidden');
    this.form.showForm();
  }
}

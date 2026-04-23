export default class DragController {
  constructor() {
    this.grabbedCard = null;
    this.clone = null;
    this.mouseX = null;
    this.mouseY = null;

    this.onMouseDownHandler = this.onMouseDown.bind(this);
    this.onMouseMoveHandler = this.onMouseMove.bind(this);
    this.onMouseUpHandler = this.onMouseUp.bind(this);

    document.addEventListener('mousedown', this.onMouseDownHandler);
  }

  cloneCard() {
    this.clone = document.createElement('li');
    this.clone.classList.add('cards__item', 'cards__item_cloned');
    this.clone.style.width = `${this.grabbedCard.clientWidth}px`;
    this.clone.style.height = `${this.grabbedCard.clientHeight}px`;
  }

  onMouseDown(event) {
    this.grabbedCard = event.target.closest('.cards__item');

    // если клик не по карточке или по крестику удаления карточки то ничего не делаем:
    if (!this.grabbedCard || event.target.classList.contains('remove-btn')) {
      return;
    }

    // 1. Определяем начальные размеры и положение карточки:
    const width = this.grabbedCard.clientWidth;
    const height = this.grabbedCard.clientHeight;
    const { top, left } = this.grabbedCard.getBoundingClientRect();

    // 2. определяем положение мыши относительно карточки:
    this.mouseX = event.clientX - left;
    this.mouseY = event.clientY - top;

    // 3. создаем клон карточки, который будет временно показывать откуда взяли карточку:
    this.cloneCard();
    this.grabbedCard.before(this.clone);

    // 4. к перемещаемой карточке добавляем спец.класс:
    this.grabbedCard.classList.add('cards__item_dragged');

    // 5. задаем размеры карточке и позиционируем её:
    this.grabbedCard.style.width = `${width}px`;
    this.grabbedCard.style.height = `${height}px`;
    this.grabbedCard.style.top = `${top}px`;
    this.grabbedCard.style.left = `${left}px`;

    document.addEventListener('mousemove', this.onMouseMoveHandler);
    document.addEventListener('mouseup', this.onMouseUpHandler);
  }

  onMouseMove(event) {
    event.preventDefault(); // чтобы не выделялся текст

    // 1. определяем положение перемещаемой карточки:
    this.grabbedCard.style.top = `${event.pageY - this.mouseY}px`;
    this.grabbedCard.style.left = `${event.pageX - this.mouseX}px`;

    // 2. определяем элемент, над которым находимся в данный момент:
    const belowElement = document.elementFromPoint(event.pageX, event.pageY);

    // если вышли за пределы вьюпорта:
    if (!belowElement) {
      return;
    }

    // 3. если список был пустой или содержал только текущую карточку, то добавляем клон в <ul>:
    const currentColumn = belowElement.closest('.column');

    if (currentColumn) {
      const currentUL = currentColumn.querySelector('.cards');

      if (!currentUL.children.length) {
        currentUL.append(this.clone);
        return;
      }

      if (currentUL.children.length === 1) {
        currentUL.append(this.clone);
        return;
      }
    }

    // 4. если оказались над другой карточкой:
    const target = belowElement.closest('.cards__item');

    if (target) {
      const { top, bottom } = target.getBoundingClientRect();

      if (event.clientY > top && event.clientY < top + target.offsetHeight / 2) {
        target.before(this.clone);
      } else if (event.clientY < bottom && event.clientY > top + target.offsetHeight / 2) {
        target.after(this.clone);
      }
    }
  }

  onMouseUp() {
    // определяем конечное положение карточки:
    this.clone.before(this.grabbedCard);
    this.clearController();
  }

  clearController() {
    // возвращаем прежние размеры карточке:
    this.grabbedCard.style.width = '100%';
    this.grabbedCard.style.height = '100%';

    // удаляем всю связанную с переносом карточки информацию:
    this.grabbedCard.classList.remove('cards__item_dragged');
    this.clone.remove(); // удаляем клон из DOM
    this.clone = null;
    this.grabbedCard = null;
    this.mouseX = null;
    this.mouseY = null;

    document.removeEventListener('mousemove', this.onMouseMoveHandler);
    document.removeEventListener('mouseup', this.onMouseUpHandler);
  }
}

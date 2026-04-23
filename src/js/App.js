import Column from '../components/column/Column';
import Container from '../components/container/Container';
import Copyrights from '../components/copyrights/Copyrights';
import DragController from '../libs/DragController';
import Storage from '../libs/Storage';

export default class App {
  constructor() {
    this.wrapper = document.querySelector('.wrapper');

    this.container = new Container();

    this.columnTodo = new Column('todo', 'todo');
    this.columnProgress = new Column('in progress', 'progress');
    this.columnDone = new Column('done', 'done');

    this.copyrights = new Copyrights();

    this.dragController = new DragController();
    this.storage = new Storage();
  }

  init() {
    this.render();
    this.copyrights.checkRights();
  }

  render() {
    this.wrapper.append(this.container.element, this.copyrights.element);

    const data = this.storage.formData;

    this.columnTodo.render('.container', data);
    this.columnProgress.render('.container', data);
    this.columnDone.render('.container', data);
  }
}

export class Section {
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item, isAppend = false) {
    const renderedItem = this._renderer(item)
    if (isAppend) {
      this._container.append(renderedItem)
    } else {
      this._container.prepend(renderedItem)
    }
  }

  renderItems() {
    this._items.forEach(item => {
      this.addItem(item, true);
    });
  }
}
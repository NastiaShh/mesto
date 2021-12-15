export class Popup {
  constructor(popupConfig, popupSelector){
    this._popupConfig = popupConfig;
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add(this._popupConfig.openPopup)
    document.addEventListener('keydown', this._handleEscClose)
  }
  
  close() {
    this._popup.classList.remove(this._popupConfig.openPopup)
    document.removeEventListener('keydown', this._handleEscClose)
  }
  
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains(this._popupConfig.openPopup)) {
        this.close()
      }
      if (event.target.classList.contains(this._popupConfig.closeButton)) {
        this.close()
      }
    })
  }
}
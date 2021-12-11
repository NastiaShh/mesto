import { popupConfig } from '../utils/constants.js';

export class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add(popupConfig.openPopup)
    document.addEventListener('keydown', this._handleEscClose)
  }
  
  close() {
    this._popup.classList.remove(popupConfig.openPopup)
    document.removeEventListener('keydown', this._handleEscClose)
  }
  
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains(popupConfig.openPopup)) {
        this.close()
      }
      if (event.target.classList.contains(popupConfig.closeButton)) {
        this.close()
      }
    })
  }
}
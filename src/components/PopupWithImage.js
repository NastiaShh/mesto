import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupConfig, popupSelector){
    super(popupConfig, popupSelector)
    this._figure = this._popup.querySelector(this._popupConfig.figureSelector)
    this._figcaption = this._figure.querySelector(this._popupConfig.placeCaptionSelector)
    this._image = this._figure.querySelector(this._popupConfig.placePopupImageSelector)
  }

  open(src, name) {
    this._image.src = src
    this._image.alt = name
    this._figcaption.textContent = name

    super.open();
  }
}

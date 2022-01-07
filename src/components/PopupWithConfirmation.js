import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupConfig, formConfig, popupSelector, submitHandler){
    super(popupConfig, popupSelector)
    this._form = this._popup.querySelector(formConfig.formSelector)
    this._submitHandler = submitHandler
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._card);
     });
  }
}
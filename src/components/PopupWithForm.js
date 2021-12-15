import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupConfig, formConfig, popupSelector, submitHandler){
    super(popupConfig, popupSelector)
    this._submitHandler = submitHandler
    this._form = this._popup.querySelector(formConfig.formSelector)
    this._inputList = this._form.querySelectorAll(formConfig.inputSelector)
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
  
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
     });
  }
  
  close() {
    super.close();
    this._form.reset();
  }
}
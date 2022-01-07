import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupConfig, formConfig, popupSelector, submitHandler){
    super(popupConfig, popupSelector)
    this._submitHandler = submitHandler
    this._form = this._popup.querySelector(formConfig.formSelector)
    this._inputList = this._form.querySelectorAll(formConfig.inputSelector)
    this._saveButton = this._form.querySelector('.popup__save')
    this._saveButtonText = this._saveButton.textContent
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
  
    return formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...';
    }
    else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
      this.renderLoading(true);
     });
  }
  
  close() {
    super.close();
    this._form.reset();
  }
}
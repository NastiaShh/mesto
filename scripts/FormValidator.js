export class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
  }

  _showInputError = (input, errorMessage) => {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._validationConfig.inputError);
    error.textContent = errorMessage;
  };
  
  _hideInputError = (input) => {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._validationConfig.inputError);
    error.textContent = '';
  };
  
  _toggleInputError = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };
  
  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  };
  
  _toggleButtonState = (inputList, saveButton) => {
    if (this._hasInvalidInput(inputList)) {
      saveButton.classList.add(this._validationConfig.saveButtonError);
      saveButton.setAttribute('disabled', true);
    } else {
      saveButton.classList.remove(this._validationConfig.saveButtonError);
      saveButton.removeAttribute('disabled');
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    const saveButton = this._form.querySelector(this._validationConfig.saveButton);
  
    this._toggleButtonState(inputList, saveButton);
  
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleInputError(input);
        this._toggleButtonState(inputList, saveButton);
      });
    });
  
    this._form.addEventListener('submit', () => {
      this._toggleButtonState(inputList, saveButton);
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  }
}


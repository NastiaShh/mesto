export class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    this._saveButton = this._form.querySelector(this._validationConfig.saveButton);
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
  
  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  };
  
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._saveButton.classList.add(this._validationConfig.saveButtonError);
      this._saveButton.setAttribute('disabled', true);
    } else {
      this._saveButton.classList.remove(this._validationConfig.saveButtonError);
      this._saveButton.removeAttribute('disabled');
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();
  
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleInputError(input);
        this._toggleButtonState();
      });
    });
  
    this._form.addEventListener('submit', () => {
      this._toggleButtonState();
    });

    this._form.addEventListener('reset', () => {
      this.resetValidation();
    });
  };
  
  _hideAllErrors = () => {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  }

  resetValidation = () => {
    this._toggleButtonState();
    this._hideAllErrors();
  }
}

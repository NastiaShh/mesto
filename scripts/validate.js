const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButton: '.popup__save',
  inputError: 'popup__input_type_error',
  saveButtonError: 'popup__save_inactive'
}

const showInputError = (form, input, validationConfig, errorMessage) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputError);
  error.textContent = errorMessage;
};

const hideInputError = (form, input, validationConfig) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputError);
  error.textContent = '';
};

const toggleInputError = (form, input, validationConfig) => {
  if (!input.validity.valid) {
    showInputError(form, input, validationConfig, input.validationMessage);
  } else {
    hideInputError(form, input, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

const toggleButtonState = (inputList, saveButton, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    saveButton.classList.add(validationConfig.saveButtonError);
    saveButton.setAttribute('disabled', true);
  } else {
    saveButton.classList.remove(validationConfig.saveButtonError);
    saveButton.removeAttribute('disabled');
  }
};
  
const setEventListeners = (form, validationConfig) => {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const saveButton = form.querySelector(validationConfig.saveButton);

  toggleButtonState(inputList, saveButton, validationConfig);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      toggleInputError(form, input, validationConfig);
      toggleButtonState(inputList, saveButton, validationConfig);
    });
  });

  form.addEventListener('submit', () => {
    toggleButtonState(inputList, saveButton, validationConfig);
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  // TODO: убрать
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form, validationConfig);
  });
}

enableValidation(validationConfig)

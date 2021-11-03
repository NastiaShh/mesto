const showInputError = (form, input, errorMessage) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add('popup__input_type_error');
  error.textContent = errorMessage;
  error.classList.add('popup__input-error_active');
};

const hideInputError = (form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input_type_error');
  error.classList.remove('popup__input-error_active');
  error.textContent = '';
};

const toggleInputError = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

const toggleButtonState = (inputList, saveButton) => {
  if (hasInvalidInput(inputList)) {
    saveButton.classList.add('popup__save_inactive');
    saveButton.setAttribute('disabled', true);
  } else {
    saveButton.classList.remove('popup__save_inactive');
    saveButton.removeAttribute('disabled');
  }
};
  
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const saveButton = form.querySelector('.popup__save');

  toggleButtonState(inputList, saveButton);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      toggleInputError(form, input);
      toggleButtonState(inputList, saveButton);
    });
  });

  form.addEventListener('submit', () => {
    toggleButtonState(inputList, saveButton);
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form);
  });
}

enableValidation()

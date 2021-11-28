import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationConfig, cardConfig, popups, popupProfile, popupPlace, editButton, addButton, nameProfileField, profileName,
descriptionProfileField, profileDescription, formProfile, namePlaceField, descriptionPlaceField, formPlace, articleElement } from '../utils/constants.js';


function openPopup(popup) {
  popup.classList.add('popup_open')
  document.addEventListener('keydown', closeByEscape)
}

function closePopup(popup) {
  popup.classList.remove('popup_open')
  document.removeEventListener('keydown', closeByEscape)
}

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open')
    closePopup(openedPopup)
  }
}

function initProfilePopupInput() {
  nameProfileField.value = profileName.textContent;
  descriptionProfileField.value = profileDescription.textContent;
  formProfileValidator.hideAllErrors();

}

function submitFormProfile(event) {
  event.preventDefault()

  profileName.textContent = nameProfileField.value;
  profileDescription.textContent = descriptionProfileField.value;

  closePopup(popupProfile)
}

function submitFormPlace(event) {
  event.preventDefault()
  const elem = {
    name: namePlaceField.value,
    link: descriptionPlaceField.value,
  }
  addCard(elem, false)

  formPlace.reset();

  closePopup(popupPlace)
}

function addCard(elem, isAppend) {
  const card = createCard(elem)
  if (isAppend) {
    articleElement.append(card)
  } else {
    articleElement.prepend(card)
  }  
}

function createCard(elem) {
  const card = new Card(cardConfig, elem.name, elem.link, '.template', openPopup)
  return card.generateCard()
}



popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup_open')) {
      closePopup(popup)
    }
    if (event.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})


initialCards.forEach((elem) => {
  addCard(elem, true)
})


addButton.addEventListener('click', () => {
  openPopup(popupPlace)
})

editButton.addEventListener('click', () => {
  initProfilePopupInput()
  openPopup(popupProfile)
})


formProfile.addEventListener('submit', submitFormProfile)
formPlace.addEventListener('submit', submitFormPlace)

const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();
const formPlaceValidator = new FormValidator(validationConfig, formPlace);
formPlaceValidator.enableValidation();
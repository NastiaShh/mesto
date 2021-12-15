import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { initialCards, validationConfig, cardConfig, popupConfig, userConfig, editButton, addButton, 
nameProfileField, descriptionProfileField, formProfile, formPlace } from '../utils/constants.js';


function createCard(elem) {
  const card = new Card(cardConfig, elem.name, elem.link, '.template', handleCardClick)
  return card.generateCard()
}

function initProfilePopupInput({name, info}) {
  nameProfileField.value = name;
  descriptionProfileField.value = info;
}

function submitFormProfile(formValues) {
  profileInfo.setUserInfo({
    name: formValues.name,
    info: formValues.description
  })
}

function submitFormPlace(formValues) {
  const elem = {
    name: formValues.name,
    link: formValues.description,
  }
  cardsSection.addItem(elem)
}

function handleCardClick(src, name) {
  popupWithImage.open(src, name)
}

addButton.addEventListener('click', () => {
  formPlaceValidator.resetValidation()
  popupWithFormPlace.open()
})

editButton.addEventListener('click', () => {
  formProfileValidator.resetValidation()
  initProfilePopupInput(profileInfo.getUserInfo())
  popupWithFormProfile.open()
})

const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();
const formPlaceValidator = new FormValidator(validationConfig, formPlace);
formPlaceValidator.enableValidation();

const popupWithImage = new PopupWithImage(popupConfig.placeContainerSelector);
popupWithImage.setEventListeners();

const cardsSection = new Section({
  items: initialCards,
  renderer: createCard
}, cardConfig.placesSelector);
cardsSection.renderItems();

const popupWithFormProfile = new PopupWithForm(popupConfig.popupProfileSelector, submitFormProfile);
popupWithFormProfile.setEventListeners();

const popupWithFormPlace = new PopupWithForm(popupConfig.popupPlaceSelector, submitFormPlace);
popupWithFormPlace.setEventListeners();

const profileInfo = new UserInfo({
  userNameSelector: userConfig.profileNameSelector, 
  userInfoSelector: userConfig.profileInfoSelector
});

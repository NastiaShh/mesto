import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import { validationConfig, cardConfig, popupConfig, userConfig, editButton, addButton, 
nameProfileField, descriptionProfileField, formProfile, formPlace, formConfig } from '../utils/constants.js';

const api = new Api({
  address: 'https://nomoreparties.co/v1/cohort-32',
  token: '6e39987b-3720-4720-b442-4085767cdc72'
})

Promise.all([
  api.getUserInfo()
  .then(userData => {
    profileInfo.setUserInfo(
      {
        name: userData.name,
        info: userData.about
      }
    )
    profileInfo.setUserAvatar(userData.avatar)
  })
  .catch((err) => {
    console.log(err);
  }),
  api.getInitialCards()
  .then(cardsData => {
    cardsData.forEach(card => {
      cardsSection.addItem(
        {
          name: card.name,
          link: card.link
        },
        true,
      )
    })
  })
  .catch((err) => {
    console.log(err);
  }),
])

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
  api.setUserInfo({
    name: formValues.name,
    about: formValues.description
  })
  .then(userData => {
    profileInfo.setUserInfo({
      name: userData.name,
      info: userData.about
    })
  })
  .catch((err) => {
    console.log(err);
  })
}

function submitFormPlace(formValues) {
  api.addCard({
    name: formValues.name,
    link: formValues.description,
  })
  .then(cardsData => {
    cardsSection.addItem(
      {
        name: cardsData.name,
        link: cardsData.link
      }
    )
  })
  .catch((err) => {
    console.log(err);
  })
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

const popupWithImage = new PopupWithImage(popupConfig, popupConfig.placeContainerSelector);
popupWithImage.setEventListeners();

const cardsSection = new Section({
  items: [],
  renderer: createCard
}, cardConfig.placesSelector);
cardsSection.renderItems();

const popupWithFormProfile = new PopupWithForm(popupConfig, formConfig, popupConfig.popupProfileSelector, submitFormProfile);
popupWithFormProfile.setEventListeners();

const popupWithFormPlace = new PopupWithForm(popupConfig, formConfig, popupConfig.popupPlaceSelector, submitFormPlace);
popupWithFormPlace.setEventListeners();

const profileInfo = new UserInfo({
  userNameSelector: userConfig.profileNameSelector, 
  userInfoSelector: userConfig.profileInfoSelector,
  userAvatarSelector: userConfig.profileAvatarSelector
});

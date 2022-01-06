import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
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
        info: userData.about,
        userId: userData._id,
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
          link: card.link,
          likes: card.likes,
          ownerId: card.owner._id,
          cardId: card._id,
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
  const card = new Card(cardConfig, elem.name, elem.link, elem.ownerId, elem.cardId, (elem.ownerId === profileInfo.getUserId()), elem.likes.length, '.template', handleCardClick, handleCardDelete)
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
        link: cardsData.link,
        likes: cardsData.likes,
        ownerId: cardsData.owner._id,
        cardId: cardsData._id,
      }
    )
  })
  .catch((err) => {
    console.log(err);
  })
}

function submitCardDelete(card) {
  api.deleteCard(card.getCardId())
  .then(data => {
    card.deleteCard()
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleCardClick(src, name) {
  popupWithImage.open(src, name)
}

function handleCardDelete(card) {
  popupWithConfirmation.open(card)
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

const popupWithConfirmation = new PopupWithConfirmation(popupConfig, formConfig, popupConfig.popupDeleteCardSelector, submitCardDelete);
popupWithConfirmation.setEventListeners();

const profileInfo = new UserInfo({
  userNameSelector: userConfig.profileNameSelector, 
  userInfoSelector: userConfig.profileInfoSelector,
  userAvatarSelector: userConfig.profileAvatarSelector
});

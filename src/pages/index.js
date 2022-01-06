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
nameProfileField, descriptionProfileField, formProfile, formPlace, formConfig, avatarButton, formAvatar } from '../utils/constants.js';

const api = new Api({
  address: 'https://nomoreparties.co/v1/cohort-32',
  token: '6e39987b-3720-4720-b442-4085767cdc72'
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    profileInfo.setUserInfo(
      {
        name: userData.name,
        info: userData.about,
        userId: userData._id,
      }
    )
    profileInfo.setUserAvatar(userData.avatar)

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
  })


function createCard(elem) {
  const card = new Card(cardConfig, elem.name, elem.link, profileInfo.getUserId(), elem.ownerId, elem.cardId, 
  (elem.ownerId === profileInfo.getUserId()), elem.likes, '.template', handleCardClick, handleCardDelete, setLike, removeLike)
  return card.generateCard()
}

function initProfilePopupInput({name, info}) {
  nameProfileField.value = name;
  descriptionProfileField.value = info;
}

function submitFormProfile(formValues) {
  popupWithFormProfile.renderLoading(true)
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
  .finally(() => {
    popupWithFormProfile.renderLoading(false)
  })
}

function submitFormPlace(formValues) {
  popupWithFormPlace.renderLoading(true)
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
  .finally(() => {
    popupWithFormPlace.renderLoading(false)
  })
}

function submitFormAvatar(formValues) {
  popupWithFormAvatar.renderLoading(true)
  api.setUserAvatar({
    avatar: formValues.avatar,
  })

  .then(userData => {
    profileInfo.setUserAvatar(userData.avatar)
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupWithFormAvatar.renderLoading(false)
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

function setLike(card) {
  api.setLike(card.getCardId())
  .then(data => {
    card.updateLikes(data.likes)
  })
  .catch((err) => {
    console.log(err);
  })
}

function removeLike(card) {
  api.removeLike(card.getCardId())
  .then(data => {
    card.updateLikes(data.likes)
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

avatarButton.addEventListener('click', () => {
  formAvatarValidator.resetValidation()
  popupWithFormAvatar.open()
})

const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();
const formPlaceValidator = new FormValidator(validationConfig, formPlace);
formPlaceValidator.enableValidation();
const formAvatarValidator = new FormValidator(validationConfig, formAvatar);
formAvatarValidator.enableValidation();

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

const popupWithFormAvatar = new PopupWithForm(popupConfig, formConfig, popupConfig.popupAvatarSelector, submitFormAvatar);
popupWithFormAvatar.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(popupConfig, formConfig, popupConfig.popupDeleteCardSelector, submitCardDelete);
popupWithConfirmation.setEventListeners();

const profileInfo = new UserInfo({
  userNameSelector: userConfig.profileNameSelector, 
  userInfoSelector: userConfig.profileInfoSelector,
  userAvatarSelector: userConfig.profileAvatarSelector
});

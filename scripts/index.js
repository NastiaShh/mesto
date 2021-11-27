import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButton: '.popup__save',
  inputError: 'popup__input_type_error',
  saveButtonError: 'popup__save_inactive'
}

const cardConfig = {
  templateSelector: '.template_card',
  placeSelector: '.place',
  placeContainerSelector: '.popup_place-image',
  figureSelector: '.figure',
  placePopupImageSelector: '.popup__image',
  placeCaptionSelector: '.popup__image-caption',
  likeButton: '.place__like',
  likeActiveButton: 'place__like_active',
  deleteButton: '.place__delete',
  placeTitleSelector: '.place__title',
  placeImageSelector: '.place__image'
}


// Переменные попапов и их кнопок

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const editButton = document.querySelector('.profile__info-edit');
const addButton = document.querySelector('.profile__add');

// Переменные формы редактирования профиля

const nameProfileField = document.querySelector('.popup__input_profile_name');
const profileName = document.querySelector('.profile__info-name');

const descriptionProfileField = document.querySelector('.popup__input_profile_description');
const profileDescription = document.querySelector('.profile__info-description');

const formProfile = document.querySelector('.popup__content_profile').querySelector('.popup__form');

// Переменные формы добавления карточки

const namePlaceField = document.querySelector('.popup__input_place_name');
const descriptionPlaceField = document.querySelector('.popup__input_place_description');

const formPlace = document.querySelector('.popup__content_place').querySelector('.popup__form');

// Переменные карточек

const articleElement = document.querySelector('.places')

// Карточки по умолчанию

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// Функции и обработчики

function openPopup(popup) {
  popup.classList.add('popup_open')
  document.addEventListener('keydown', closeByEscape)
}

function closePopup(popup) {
  popup.classList.remove('popup_open')
  document.removeEventListener('keydown', closeByEscape)
}


// Открытие попапа добавления карточки

addButton.addEventListener('click', (event) => {
  openPopup(popupPlace)
})


// Редактирование профиля

function initProfilePopupInput() {
  nameProfileField.value = profileName.textContent;
  descriptionProfileField.value = profileDescription.textContent;
}

editButton.addEventListener('click', (event) => {
  initProfilePopupInput()
  openPopup(popupProfile)
})

initProfilePopupInput()

function submitFormProfile(event) {
    event.preventDefault()

    profileName.textContent = nameProfileField.value;
    profileDescription.textContent = descriptionProfileField.value;

    closePopup(popupProfile)
}

formProfile.addEventListener('submit', submitFormProfile)


// Добавление карточки

function prependCard(elem){
  const card = createCard(elem)
  articleElement.prepend(card)
}

function submitFormPlace(event) {
    event.preventDefault()
    const elem = {
      name: namePlaceField.value,
      link: descriptionPlaceField.value,
    }
    prependCard(elem)

    formPlace.reset();

    closePopup(popupPlace)
}

formPlace.addEventListener('submit', submitFormPlace)


// Закрытие попапов

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

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open')
    closePopup(openedPopup)
  }
}

function appendCard(elem) {
  const card = createCard(elem)
  articleElement.append(card)
}

initialCards.forEach(appendCard)

function createCard(elem) {
  const card = new Card(cardConfig, elem.name, elem.link, '.template', openPopup)
  return card.generateCard()
}

const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation(); 
const formPlaceValidator = new FormValidator(validationConfig, formPlace);
formPlaceValidator.enableValidation();
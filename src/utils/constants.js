// Карточки по умолчанию

export const initialCards = [
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



export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButton: '.popup__save',
  inputError: 'popup__input_type_error',
  saveButtonError: 'popup__save_inactive'
}

export const cardConfig = {
  templateSelector: '.template_card',
  placeSelector: '.place',
  likeButton: '.place__like',
  likeActiveButton: 'place__like_active',
  deleteButton: '.place__delete',
  placeTitleSelector: '.place__title',
  placeImageSelector: '.place__image',
  placesSelector: '.places'
}

export const popupConfig = {
  openPopup: 'popup_open',
  closeButton: 'popup__close',
  placeContainerSelector: '.popup_place-image',
  figureSelector: '.figure',
  placePopupImageSelector: '.popup__image',
  placeCaptionSelector: '.popup__image-caption',
  popupPlaceSelector: '.popup_place',
  popupProfileSelector: '.popup_profile'
}

export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input'
}

export const userConfig = {
  profileNameSelector: '.profile__info-name',
  profileInfoSelector: '.profile__info-description'
}

// Переменные попапов и их кнопок

export const editButton = document.querySelector('.profile__info-edit');
export const addButton = document.querySelector('.profile__add');

// Переменные формы редактирования профиля

export const nameProfileField = document.querySelector('.popup__input_profile_name');

export const descriptionProfileField = document.querySelector('.popup__input_profile_description');

export const formProfile = document.querySelector('.popup__content_profile').querySelector('.popup__form');

// Переменные формы добавления карточки


export const formPlace = document.querySelector('.popup__content_place').querySelector('.popup__form');

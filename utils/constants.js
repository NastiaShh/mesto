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

export const popups = document.querySelectorAll('.popup');
export const popupProfile = document.querySelector('.popup_profile');
export const popupPlace = document.querySelector('.popup_place');
export const editButton = document.querySelector('.profile__info-edit');
export const addButton = document.querySelector('.profile__add');

// Переменные формы редактирования профиля

export const nameProfileField = document.querySelector('.popup__input_profile_name');
export const profileName = document.querySelector('.profile__info-name');

export const descriptionProfileField = document.querySelector('.popup__input_profile_description');
export const profileDescription = document.querySelector('.profile__info-description');

export const formProfile = document.querySelector('.popup__content_profile').querySelector('.popup__form');

// Переменные формы добавления карточки

export const namePlaceField = document.querySelector('.popup__input_place_name');
export const descriptionPlaceField = document.querySelector('.popup__input_place_description');

export const formPlace = document.querySelector('.popup__content_place').querySelector('.popup__form');

// Переменные карточек

export const articleElement = document.querySelector('.places');
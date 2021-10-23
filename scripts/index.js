// Открытие попапа редактирования профиля

const popup_profile = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__info-edit');

const nameProfileField = document.querySelector('.popup__input_profile_name');
const profileName = document.querySelector('.profile__info-name');

const descriptionProfileField = document.querySelector('.popup__input_profile_description');
const profileDescription = document.querySelector('.profile__info-description');

function openPopup() {
    nameProfileField.value = profileName.textContent;
    descriptionProfileField.value = profileDescription.textContent;
    popup_profile.classList.add('popup_open');
}

editButton.addEventListener('click', openPopup)



// Открытие попапа добавления карточки

const popup_place = document.querySelector('.popup_place');
const addButton = document.querySelector('.profile__add');

const namePlaceField = document.querySelector('.popup__input_place_name');

const descriptionPlaceField = document.querySelector('.popup__input_place_description');

function openPopupPlace() {
    popup_place.classList.add('popup_open');
}

addButton.addEventListener('click', openPopupPlace)



// Редактирование профиля

const formProfile = document.querySelector('.popup__content_profile').querySelector('.popup__form');

function submitFormProfile(event) {
    event.preventDefault()

    profileName.textContent = nameProfileField.value;
    profileDescription.textContent = descriptionProfileField.value;

    closePopup();
}

formProfile.addEventListener('submit', submitFormProfile)



// Шесть карточек «из коробки»

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

const articleElement = document.querySelector('.places')
const templateCard = document.querySelector('.template_card').content

function createCard(elem){
  const card = templateCard.querySelector('.place').cloneNode(true)
  card.querySelector('.place__image').src = elem.link
  card.querySelector('.place__image').alt = elem.name
  card.querySelector('.place__title').innerText = elem.name

  card.querySelector('.place__delete').addEventListener('click', (event) => {
    event.target.closest('.place').remove()
  })

  card.querySelector('.place__image').addEventListener('click', (event) => {
    openPopupImage(elem)
  })

  return card
}

function appendCard(elem){
  const card = createCard(elem)
  articleElement.append(card)
}

initialCards.forEach(appendCard)



// Добавление карточки

function prependCard(elem){
  const card = createCard(elem)
  articleElement.prepend(card)
}

const formPlace = document.querySelector('.popup__content_place').querySelector('.popup__form');

function submitFormPlace(event) {
    event.preventDefault()
    const elem = {
      name: namePlaceField.value,
      link: descriptionPlaceField.value,
    }
    prependCard(elem)

    closePopup()
}

formPlace.addEventListener('submit', submitFormPlace)



// Открытие и закрытие попапа изображения карточки

const popup_image = document.querySelector('.popup_place-image')

function openPopupImage(elem) {
  const figure = popup_image.querySelector('.figure')
  figure.querySelector('.popup__image').src = elem.link
  figure.querySelector('.popup__image').alt = elem.name
  figure.querySelector('.popup__image-caption').innerText = elem.name

  popup_image.classList.add('popup_open')
}

closePopup()




// Лайк карточки
// FIXME:
const like = document.querySelectorAll('.place__like');

function likeActive(i) {
  if (like[i].classList.contains('place__like_active')) {
      like[i].classList.remove('place__like_active')
  } else {
      like[i].classList.add('place__like_active')
  }
}

for (let i = 0; i < like.length; i++) {
  like[i].addEventListener('click', function() {
    likeActive(i)
  })
}



// Закрытие попапов

const popupCloseButton = document.querySelectorAll('.popup__close')

function closePopup() {
  popup_profile.classList.remove('popup_open')
  popup_place.classList.remove('popup_open')
  popup_image.classList.remove('popup_open')
}

popupCloseButton.forEach(popupCloseButton =>
  popupCloseButton.addEventListener('click', closePopup)
);

// function popupClickHandler(event) {
//     if (event.target.classList.contains('popup')) {
//         closePopup()
//     }
// }

// popup.addEventListener('mouseup', popupClickHandler)



// Плавное открытие и закрытие попапов

window.addEventListener('load', () => {
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_smooth'))
})
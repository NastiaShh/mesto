// Переменные попапов и их кнопок

const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupImage = document.querySelector('.popup_place-image');
const editButton = document.querySelector('.profile__info-edit');
const addButton = document.querySelector('.profile__add');
const popupCloseButtons = document.querySelectorAll('.popup__close')

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
const templateCard = document.querySelector('.template_card').content

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
  popup.classList.add('popup_open');
}

function closePopup(popup) {
  popup.classList.remove('popup_open')
}


// Открытие попапа добавления карточки

addButton.addEventListener('click', (event) => {
  openPopup(popupPlace)
})


// Редактирование профиля

editButton.addEventListener('click', (event) => {
  nameProfileField.value = profileName.textContent;
  descriptionProfileField.value = profileDescription.textContent;
  openPopup(popupProfile)
})

function submitFormProfile(event) {
    event.preventDefault()

    profileName.textContent = nameProfileField.value;
    profileDescription.textContent = descriptionProfileField.value;

    closePopup(popupProfile);
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


// Лайк карточки

function likeActive(likeElem) {
  likeElem.classList.toggle('place__like_active')
}


// Закрытие попапов

popupCloseButtons.forEach(popupCloseButton =>
  popupCloseButton.addEventListener('click', (event) => {
    const popup = popupCloseButton.closest('.popup')
    closePopup(popup)
  })
);


// Добавление карточек


function createCard(elem){
  const card = templateCard.querySelector('.place').cloneNode(true)
  card.querySelector('.place__image').src = elem.link
  card.querySelector('.place__image').alt = elem.name
  card.querySelector('.place__title').textContent = elem.name

  card.querySelector('.place__delete').addEventListener('click', (event) => {
    event.target.closest('.place').remove()
  })

  card.querySelector('.place__image').addEventListener('click', (event) => {
    const figure = popupImage.querySelector('.figure')
    figure.querySelector('.popup__image').src = elem.link
    figure.querySelector('.popup__image').alt = elem.name
    figure.querySelector('.popup__image-caption').textContent = elem.name

    openPopup(popupImage)
  })
  
  card.querySelector('.place__like').addEventListener('click', (event) => {
    likeActive(event.target)
  })

  return card
}

function appendCard(elem){
  const card = createCard(elem)
  articleElement.append(card)
}

initialCards.forEach(appendCard)
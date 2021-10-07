const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__info-edit');

const formButton = document.querySelector('.popup__button');
const form = document.querySelector('.popup__form');

const nameField = document.querySelector('.popup__input_name');
const profileName = document.querySelector('.profile__info-name');

const descriptionField = document.querySelector('.popup__input_description');
const profileDescription = document.querySelector('.profile__info-description');

nameField.value = profileName.textContent;
descriptionField.value = profileDescription.textContent;


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


function openPopup() {
    popup.classList.add('popup_isOpen')
}

function closePopup() {
    popup.classList.remove('popup_isOpen')
}

editButton.addEventListener('click', openPopup)

popupCloseButton.addEventListener('click', closePopup)

function popupClickHandler(event) {
    if (event.target.classList.contains('popup')) {
        closePopup()
    }
}

popup.addEventListener('mouseup', popupClickHandler)

function submitForm(event) {
    event.preventDefault()

    profileName.textContent = nameField.value;
    profileDescription.textContent = descriptionField.value;

    closePopup();
}

form.addEventListener('submit', submitForm)
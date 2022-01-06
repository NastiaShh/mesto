export class Card {
  constructor(cardConfig, name, link, ownerId, cardId, isUserCard, likesCount, cardSelector, handleCardClick, handleCardDelete) {
    this._cardConfig = cardConfig;
    this._name = name;
    this._link = link;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._isUserCard = isUserCard;
    this._likesCount = likesCount;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const templateCard = document.querySelector(this._cardConfig.templateSelector).content.querySelector(this._cardConfig.placeSelector).cloneNode(true);
    return templateCard;
  }

  _likeCard(event) {
    event.target.classList.toggle(this._cardConfig.likeActiveButton);
  }

  deleteCard() {
    this._element.remove()
    this._element = null
  }

  getCardId() {
    return this._cardId;
  }

  _setEventListeners() {

    this._element.querySelector(this._cardConfig.placeImageSelector).addEventListener('click', () => { 
      this._handleCardClick(this._link, this._name);
    });

    this._element.querySelector(this._cardConfig.likeButton).addEventListener('click', (event) => {
      this._likeCard(event);
    });

    this._element.querySelector(this._cardConfig.deleteButton).addEventListener('click', () => {
      this._handleCardDelete(this);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardConfig.placeImageSelector);
    this._setEventListeners();
    this._element.querySelector(this._cardConfig.placeTitleSelector).textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._deleteButton = this._element.querySelector(this._cardConfig.deleteButton);
    if(this._isUserCard) {
      this._deleteButton.classList.add('place__delete_active');
    };
    this._likesCountElement = this._element.querySelector(this._cardConfig.likesCountSelector);
    this._likesCountElement.textContent = this._likesCount;
    return this._element;
  }
}
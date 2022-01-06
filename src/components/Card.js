export class Card {
  constructor(cardConfig, name, link, userId, ownerId, cardId, isUserCard, likes, cardSelector, handleCardClick, handleCardDelete, setLike, removeLike) {
    this._cardConfig = cardConfig;
    this._name = name;
    this._link = link;
    this._userId = userId;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._isUserCard = isUserCard;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._setLike = setLike;
    this._removeLike = removeLike;
  }

  _getTemplate() {
    const templateCard = document.querySelector(this._cardConfig.templateSelector).content.querySelector(this._cardConfig.placeSelector).cloneNode(true);
    return templateCard;
  }

  _isLikedByUser() {
    return this._likes.some(like => like['_id'] === this._userId)

  }

  _likeCard() {
    if(this._isLikedByUser()) {
      this._removeLike(this)
    } else {
      this._setLike(this)
    }
  }

  updateLikes(likes) {
    this._likes = likes;
    this._likesCountElement.textContent = this._likes.length;
    if(this._isLikedByUser()) {
      this._likeButton.classList.add(this._cardConfig.likeActiveButton)
    } else {
      this._likeButton.classList.remove(this._cardConfig.likeActiveButton)
    }
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
    this._likeButton = this._element.querySelector(this._cardConfig.likeButton);
    this.updateLikes(this._likes);
    return this._element;
  }
}
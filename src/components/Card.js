export class Card {
  constructor(cardConfig, name, link, cardSelector, handleCardClick) {
    this._cardConfig = cardConfig;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const templateCard = document.querySelector(this._cardConfig.templateSelector).content.querySelector(this._cardConfig.placeSelector).cloneNode(true);
    return templateCard;
  }

  _likeCard(event) {
    event.target.classList.toggle(this._cardConfig.likeActiveButton); 
  }

  _deleteCard() {
    this._element.remove()
    this._element = null
  }

  _setEventListeners() {

    this._element.querySelector(this._cardConfig.placeImageSelector).addEventListener('click', () => { 
      this._handleCardClick(this._link, this._name);
    });

    this._element.querySelector(this._cardConfig.likeButton).addEventListener('click', (event) => {
      this._likeCard(event);
    });

    this._element.querySelector(this._cardConfig.deleteButton).addEventListener('click', (event) => {
      this._deleteCard(event);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardConfig.placeImageSelector);
    this._setEventListeners();
    this._element.querySelector(this._cardConfig.placeTitleSelector).textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    return this._element;
  }
}
export class Card {
  constructor(cardConfig, name, link, cardSelector, openPopup) {
    this._cardConfig = cardConfig;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const templateCard = document.querySelector(this._cardConfig.templateSelector).content.querySelector(this._cardConfig.placeSelector).cloneNode(true);
    return templateCard;
  }

  _openImagePopup() {
    const popupImage = document.querySelector(this._cardConfig.placeContainerSelector);
    const figure = popupImage.querySelector(this._cardConfig.figureSelector)
    const image = figure.querySelector(this._cardConfig.placePopupImageSelector)
    image.src = this._link
    image.alt = this._name
    figure.querySelector(this._cardConfig.placeCaptionSelector).textContent = this._name
    this._openPopup(popupImage);
  }

  _setEventListeners() {

    this._element.querySelector(this._cardConfig.placeImageSelector).addEventListener('click', () => { 
      this._openImagePopup();
    });

    this._element.querySelector(this._cardConfig.likeButton).addEventListener('click', (event) => {
      event.target.classList.toggle(this._cardConfig.likeActiveButton); 
    });

    this._element.querySelector(this._cardConfig.deleteButton).addEventListener('click', (event) => {
      event.target.closest(this._cardConfig.placeSelector).remove()
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(this._cardConfig.placeTitleSelector).textContent = this._name;
    this._element.querySelector(this._cardConfig.placeImageSelector).src = this._link;
    this._element.querySelector(this._cardConfig.placeImageSelector).alt = this._name;
    return this._element;
  }
}
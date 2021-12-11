import { Popup } from "./Popup.js";
import { popupConfig } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector)
  }

  open(src, name) {
    const popupImage = document.querySelector(popupConfig.placeContainerSelector);
    const figure = popupImage.querySelector(popupConfig.figureSelector)
    const image = figure.querySelector(popupConfig.placePopupImageSelector)
    image.src = src
    image.alt = name
    figure.querySelector(popupConfig.placeCaptionSelector).textContent = name

    super.open();
  }
}

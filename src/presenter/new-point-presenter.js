import {remove, render, RenderPosition} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import {UserAction, UpdateType} from '../const.js';


export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #pointModel = null;
  #newPoint = {
    basePrice: 0,
    dateFrom: '2025-07-09T12:55:56.845Z',
    dateTo: '2025-07-11T13:22:13.375Z',
    destination: '7c8486a2-3742-4e76-b1b4-654ba53ffe8b',
    isFavorite: false,
    offers: [],
    type: 'taxi',
  };

  constructor({pointListContainer, onDataChange, onDestroy, pointModel}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#pointModel = pointModel;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#pointEditComponent = new EditPointView({
      point: this.#newPoint,
      destination: this.#pointModel.destination.destinations,
      offers: this.#pointModel.offers.offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

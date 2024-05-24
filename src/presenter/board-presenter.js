import SortView from '../view/sort-view.js';
// import AddNewPointView from '../view/add-new-point.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import EventsListView from '../view/events-list-view.js';

export default class BoardPresenter {
  #eventListComponent = new EventsListView();
  #boardContainer = null;
  #headerContainer = null;
  #pointModel = null;
  constructor({ boardContainer, headerContainer, pointModel }) {
    this.#boardContainer = boardContainer;
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    const points = this.#pointModel.points;
    const destination = this.#pointModel.destination;
    const offers = this.#pointModel.offers;
    render(new TripInfoView(), this.#headerContainer);
    render(new FilterView(), this.#headerContainer);
    render(new NewEventButtonView(), this.#headerContainer);
    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);
    // render(new AddNewPointView(), this.#eventListComponent.element);
    points.forEach((point) => {
      this.#renderPoint(point, destination, offers);
    });
  };

  #renderPoint(point, destination, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point,
      destination,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const pointEditComponent = new EditPointView({
      point,
      destination,
      offers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }
    render(pointComponent, this.#eventListComponent.element);
  }
}

import SortView from '../view/sort-view.js';
// import AddNewPointView from '../view/add-new-point.js';
import { updateItem } from '../utils/common.js';
import { render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import { isEmpty } from '../utils/utils.js';
import ListEmptyView from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #eventListComponent = new EventsListView();
  #emptyListComponent = new ListEmptyView();
  #sortComponent = new SortView();
  #boardContainer = null;
  #pointModel = null;
  #points = [];
  #destination = [];
  #offers = [];
  #pointPresenters = new Map();
  constructor({ boardContainer, pointModel }) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#points = [...this.#pointModel.points];
    this.#destination = [...this.#pointModel.destination];
    this.#offers = [...this.#pointModel.offers];
    // render(new AddNewPointView(), this.#eventListComponent.element);
    this.#renderBoard();
  };

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#boardContainer);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderEventList() {
    render(this.#eventListComponent, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    this.#pointPresenters.set(point.id, pointPresenter);
    pointPresenter.init(point, this.#destination, this.#offers);
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderBoard() {
    if (isEmpty(this.#points)) {
      this.#renderEmptyList();
    } else {
      this.#renderSort();
      this.#renderEventList();
      this.#renderPoints();
    }
  }
}

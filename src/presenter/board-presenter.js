import SortView from '../view/sort-view.js';
import { render, remove} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import { isEmpty } from '../utils/utils.js';
import ListEmptyView from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortDay, sortTime, sortPrice} from '../utils/sort.js';
import {filter} from '../utils/filter.js';

export default class BoardPresenter {
  #eventListComponent = new EventsListView();
  #emptyListComponent = null;
  #boardContainer = null;
  #newPointPresenter = null;
  #pointModel = null;
  #pointPresenters = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;

  constructor({ boardContainer, pointModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter({
      pointModel: this.#pointModel,
      pointListContainer: this.#boardContainer,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points () {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {

      case SortType.DAY:
        return filteredPoints.sort(sortDay);
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
    }
    return filteredPoints;
  }

  get destination () {
    return this.#pointModel.destination;
  }

  get offers () {
    return this.#pointModel.offers;
  }


  init = () => {
    this.#renderBoard();
  };

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderEventList() {
    render(this.#eventListComponent, this.#boardContainer);
    this.#renderPoints();
  }

  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    this.#pointPresenters.set(point.id, pointPresenter);
    pointPresenter.init(point, this.destination, this.offers);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortComponent);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderEmptyList() {
    this.#emptyListComponent = new ListEmptyView({
      filterType: this.#filterType
    });
    render(this.#emptyListComponent, this.#boardContainer);
  }

  #renderBoard() {
    if (isEmpty(this.points)) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    this.#renderEventList();

  }
}

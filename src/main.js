import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import { render } from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import FilterModel from './model/filter-model.js';
import 'flatpickr/dist/flatpickr.min.css';

const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  pointModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripMainElement,
  filterModel,
  pointModel
});

const newPointButtonComponent = new NewEventButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(new TripInfoView(), tripMainElement);
filterPresenter.init();
render(newPointButtonComponent, tripMainElement);
boardPresenter.init();

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
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripMainElement,
  filterModel,
  pointModel
});

render(new TripInfoView(), tripMainElement);
filterPresenter.init();
render(new NewEventButtonView(), tripMainElement);
boardPresenter.init();

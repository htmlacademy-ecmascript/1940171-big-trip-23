import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import { generateFilter } from './mock/filter.js';

const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const pointModel = new PointModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  pointModel,
});
const filters = generateFilter(pointModel.points);

render(new TripInfoView(), tripMainElement);
render(new FilterView({ filters }), tripMainElement);
render(new NewEventButtonView(), tripMainElement);
boardPresenter.init();

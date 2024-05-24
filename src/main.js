import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement, headerContainer:tripMainElement, pointModel});

boardPresenter.init();

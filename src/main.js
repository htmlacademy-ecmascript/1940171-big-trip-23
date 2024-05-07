import BoardPresenter from './presenter/board-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement, headerContainer:tripMainElement});

boardPresenter.init();

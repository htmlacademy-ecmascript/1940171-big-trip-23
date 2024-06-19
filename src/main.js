import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import { render } from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import FilterModel from './model/filter-model.js';
import 'flatpickr/dist/flatpickr.min.css';
import PointApiService from './points-api-service.js';
import OffersApiService from './offers-api-service';
import DestinationsApiService from './destinations-api-service';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';

const AUTHORIZATION = 'Basic oNch8eSu6suAsrS100';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const filterModel = new FilterModel();

const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});

const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});

const pointModel = new PointModel({
  pointsApiService: new PointApiService(END_POINT, AUTHORIZATION),
  destination: destinationsModel,
  offers: offersModel
});

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

boardPresenter.init();
pointModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripMainElement);
  });

import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTaskDueDate } from '../utils/utils.js';
import { getDateDifference } from '../utils/utils.js';
import he from 'he';
const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT_DAY = 'MMM DD';

function createPointTemplate(point, destination, offers) {
  const {type, isFavorite, basePrice, dateFrom, dateTo} = point;
  const currentDestination = destination.find((destinations) => destinations.id === point.destination);
  const typeOffers = offers.find((offer) => offer.type === type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));

  return (`
  <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${humanizeTaskDueDate(dateFrom,DATE_FORMAT_DAY)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${currentDestination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T12:25">${humanizeTaskDueDate(dateFrom,DATE_FORMAT_TIME)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T13:35">${humanizeTaskDueDate(dateTo,DATE_FORMAT_TIME)}</time>
                  </p>
                  <p class="event__duration">${getDateDifference(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${he.encode(String(basePrice))}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                  ${pointOffers.map((offer) =>(
      `<li class="event__offer">
                            <span class="event__offer-title">${offer.title}</span>
                            &plus;&euro;&nbsp;
                            <span class="event__offer-price">${offer.price}</span>
                          </li>`)).join('')}
                  </li>
                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
  `);
}

export default class PointView extends AbstractView {
  #destination = null;
  #point = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;
  constructor({point, destination, offers, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template () {
    return createPointTemplate(this.#point, this.#destination, this.#offers);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}

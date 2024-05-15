import {createElement} from '../render.js';
import { humanizeTaskDueDate } from '../utils.js';
import { EVENT_TYPE } from '../const.js';

const DATE_FORMAT = 'DD/MM/YY HH:MM';

function createEditPointTemplate(point, destination, offers) {
  const {type, basePrice, dateFrom, dateTo} = point;
  const currentDestination = destination.find((destinations) => destinations.id === point.destination);
  const typeOffers = offers.find((offer) => offer.type === type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));

  return (`
  <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${EVENT_TYPE.map((item)=> (`
                        <div class="event__type-item">
                        <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
                        <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
                      </div>
                      `)).join('')}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destination.map((item)=>`<option value="${item.name}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeTaskDueDate(dateFrom, DATE_FORMAT)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeTaskDueDate(dateTo, DATE_FORMAT)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${point.offers.length ? `<section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                  ${pointOffers.map((typeOffer) => (

      `<div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                      <label class="event__offer-label" for="event-offer-luggage-1">
                        <span class="event__offer-title">${typeOffer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${typeOffer.price}</span>
                      </label>
                    </div>
                  `))}
                  </div>
                </section>` : ''}

                  ${currentDestination.description ? createDescription(currentDestination) : ''}
                </section>
              </form>
            </li>
  `);
}

function createDescription (destination) {
  return (
    `<section class="event__section  event__section--destination">
<h3 class="event__section-title  event__section-title--destination">Destination</h3>
<p class="event__destination-description">${destination.description}</p>
${destination.pictures.length ? `<div class="event__photos-container">
<div class="event__photos-tape">
${destination.pictures.map((item)=>`<img class="event__photo" src="${item.src}" alt="Event photo">`).join('')}

  </div>
</div>` : ''}

</section>
`
  );
}

export default class EditPointView {
  constructor(point, destination, offers) {
    this.point = point;
    this.destination = destination;
    this.offers = offers;
  }

  getTemplate = () => createEditPointTemplate(this.point, this.destination, this.offers);

  getElement = () => {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  };

  removeElement = () => {
    this.element = null;
  };
}

import { points } from '../mock/points';
import { destination } from '../mock/destination';
import { offers } from '../mock/offers';

export default class PointModel {
  #points = points;
  #destination = destination;
  #offers = offers;

  get points () {
    return this.#points;
  }

  get destination () {
    return this.#destination;
  }

  get offers () {
    return this.#offers;
  }
}

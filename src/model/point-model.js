import { points } from '../mock/points';
import { destination } from '../mock/destination';
import { offers } from '../mock/offers';

export default class PointModel {
  constructor() {
    this.points = [];
    this.destination = [];
    this.offers = [];
  }

  init = () => {
    this.points = points;
    this.destination = destination;
    this.offers = offers;
  };

  getPoints = () => this.points;
  getDestination = () => this.destination;
  getOffers = () => this.offers;
}

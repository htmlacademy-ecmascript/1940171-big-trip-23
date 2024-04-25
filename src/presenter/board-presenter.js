import SortView from '../view/sort-view.js';
import AddNewPointView from '../view/add-new-point.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';

export default class BoardPresenter {


  constructor({boardContainer,headerContainer}) {
    this.boardContainer = boardContainer;
    this.headerContainer = headerContainer;
  }

  init() {
    render(new TripInfoView(), this.headerContainer);
    render(new FilterView(), this.headerContainer);
    render(new NewEventButtonView(), this.headerContainer);
    render(new SortView(),this.boardContainer);
    render(new AddNewPointView(),this.boardContainer);
    render(new EditPointView(),this.boardContainer);
    for (let i = 0; i < 3;i++) {
      render(new PointView(),this.boardContainer);
    }
  }
}

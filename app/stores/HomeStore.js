import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import helper from '../helper';
import cache from '../cache';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.todaysDate = helper.todaysDate();
    this.pickedDate = this.todaysDate;
    this.oneDay = 1000*60*60*24; // one day in epoch (ms)
    this.scoreboard = [];
  }

  onGetScoreboardSuccess(data) {
    cache.setCache('scoreboard_'+data.epochDate, data.data);
    this.scoreboard = data.data;
    this.pickedDate = helper.getDate(data.epochDate);
  }

  onGetScoreboardFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(HomeStore);

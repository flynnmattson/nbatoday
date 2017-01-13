import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import helper from '../helper';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.todaysDate = helper.todaysDate();
    this.pickedDate = this.todaysDate;
    this.oneDay = 1000*60*60*24; // one day in epoch (ms)
    this.scoreboard = [];
  }

  onGetScoreboardSuccess(data) {
    this.scoreboard = data;
  }

  onGetScoreboardFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onChangeDate(epochDate){
    this.pickedDate = helper.getDate(epochDate);
  }
}

export default alt.createStore(HomeStore);

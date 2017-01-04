import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.scoreboard = [];
  }

  onGetScoreboardSuccess(data) {
    this.scoreboard = data;
  }

  onGetScoreboardFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(HomeStore);

import alt from '../alt';
import StandingsActions from '../actions/StandingsActions';
import helper from '../helper';

class StandingsStore {
  constructor() {
    this.bindActions(StandingsActions);
    this.eastStandings = [];
    this.westStandings = [];
    this.todaysDate = helper.todaysDate();
  }

  onGetStandingsSuccess(data) {
    this.eastStandings = data.east;
    this.westStandings = data.west;
  }

  onGetStandingsFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(StandingsStore);

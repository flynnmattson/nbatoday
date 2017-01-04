import alt from '../alt';
import StandingsActions from '../actions/StandingsActions';

class StandingsStore {
  constructor() {
    this.bindActions(StandingsActions);
    this.eastStandings = [];
    this.westStandings = [];
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

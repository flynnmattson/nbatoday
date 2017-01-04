import alt from '../alt';
import GameActions from '../actions/GameActions';

class GameStore {
  constructor() {
    this.bindActions(GameActions);
    this.teamStats = [];
    this.playerStats = [];
  }

  onGetGameSuccess(data) {
    this.teamStats = data.team_stats;
    this.playerStats = data.player_stats;
  }

  onGetGameFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(GameStore);

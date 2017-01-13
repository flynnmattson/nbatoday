import alt from '../../alt';
import GameActions from '../../actions/game/GameActions';

class GameStore {
  constructor() {
    this.bindActions(GameActions);
    this.gameSummary = {};
    this.gameScore = [];
  }

  onGetGameSummarySuccess(data) {
    this.gameSummary = data.summary[0];
    this.gameScore = data.score;
  }

  onGetGameSummaryFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(GameStore);

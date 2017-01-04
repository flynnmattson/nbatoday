import alt from '../alt';
import GameActions from '../actions/GameActions';

class GameStore {
  constructor() {
    this.bindActions(GameActions);
    this.game = {};
  }

  onGetGameSuccess(data) {
    this.game = data;
  }

  onGetGameFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(GameStore);

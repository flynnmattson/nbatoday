import alt from '../../alt';
import LiveGameActions from '../../actions/game/LiveGameActions';
import cache from '../../cache';

class LiveGameStore {
  constructor() {
    this.bindActions(LiveGameActions);
    this.stats = [];
  }

  onGetPlaybyPlaySuccess(data) {
    this.stats = data;
  }

  onGetPlaybyPlayFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(LiveGameStore);

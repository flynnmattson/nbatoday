import alt from '../../alt';
import PostGameActions from '../../actions/game/PostGameActions';

class PostGameStore {
  constructor() {
    this.bindActions(PostGameActions);
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

export default alt.createStore(PostGameStore);

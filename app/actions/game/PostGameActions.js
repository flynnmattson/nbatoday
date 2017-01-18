import alt from '../../alt';
import cache from '../../cache';

class PostGameActions {
  constructor() {
    this.generateActions(
      'getGameSuccess',
      'getGameFail',
      'changeTab'
    );
  }

  getGame(gameId){
    if(cache.getCache('game_'+gameId)){
      this.actions.getGameSuccess(cache.getCache('game_'+gameId));
    }else{
      $.ajax({ url: '/api/game/'+gameId })
      .done(data => {
        cache.setCache('game_'+gameId, data);
        this.actions.getGameSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getGameFail(jqXhr.responseJSON.message);
      });
    }
  }
}

export default alt.createActions(PostGameActions);

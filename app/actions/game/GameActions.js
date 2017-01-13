import alt from '../../alt';
import cache from '../../cache';

class GameActions {
  constructor() {
    this.generateActions(
      'getGameSummarySuccess',
      'getGameSummaryFail'
    );
  }

  getGameSummary(gameId){
    if(cache.getCache('game_summary_'+gameId)){
      this.actions.getGameSummarySuccess(cache.getCache('game_summary_'+gameId));
    }else{
      $.ajax({ url: '/api/game_summary/'+gameId })
      .done(data => {
        cache.setCache('game_summary_'+gameId, data);
        this.actions.getGameSummarySuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getGameSummaryFail(jqXhr.responseJSON.message);
      });
    }
  }
}

export default alt.createActions(GameActions);

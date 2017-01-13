import alt from '../../alt';
import cache from '../../cache';

class LiveGameActions {
  constructor() {
    this.generateActions(
      'getPlaybyPlaySuccess',
      'getPlaybyPlayFail'
    );
  }

  getPlaybyPlay(gameId){
    if(cache.getCache('playbyplay_'+gameId)){
      this.actions.getPlaybyPlaySuccess(cache.getCache('playbyplay_'+gameId));
    }else{
      $.ajax({ url: '/api/play_by_play/'+gameId })
      .done(data => {
        cache.setCache('playbyplay_'+gameId, data);
        this.actions.getPlaybyPlaySuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getPlaybyPlayFail(jqXhr.responseJSON.message);
      });
    }
  }
}

export default alt.createActions(LiveGameActions);

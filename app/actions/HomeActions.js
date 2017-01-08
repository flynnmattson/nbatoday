import alt from '../alt';
import cache from '../cache';

class HomeActions {
  constructor() {
    this.generateActions(
      'getScoreboardSuccess',
      'getScoreboardFail'
    );
  }

  getScoreboard(epochDate){
    if(cache.getCache('scoreboard_'+epochDate)){
      this.actions.getScoreboardSuccess({data:cache.getCache('scoreboard_'+epochDate), epochDate:epochDate});
    }else{
      $.ajax({ url: '/api/scoreboard/'+epochDate })
      .done(data => {
        this.actions.getScoreboardSuccess({data:data, epochDate:epochDate});
      })
      .fail(jqXhr => {
        this.actions.getScoreboardFail(jqXhr.responseJSON.message);
      });
    }
  }
}

export default alt.createActions(HomeActions);

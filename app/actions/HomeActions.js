import alt from '../alt';
import cache from '../cache';

class HomeActions {
  constructor() {
    this.generateActions(
      'getScoreboardSuccess',
      'getScoreboardFail',
      'changeDate'
    );
  }

  getScoreboard(epochDate){
    if(cache.getCache('scoreboard_'+epochDate)){
      this.actions.getScoreboardSuccess(cache.getCache('scoreboard_'+epochDate));
    }else{
      $.ajax({ url: '/api/scoreboard/'+epochDate })
      .done(data => {
        cache.setCache('scoreboard_'+epochDate, data);
        this.actions.getScoreboardSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getScoreboardFail(jqXhr.responseJSON.message);
      });
    }
  }
}

export default alt.createActions(HomeActions);

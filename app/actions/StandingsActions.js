import alt from '../alt';
import cache from '../cache';

class StandingsActions {
  constructor() {
    this.generateActions(
      'getStandingsSuccess',
      'getStandingsFail'
    );
  }

  getStandings(epochDate){
    if(cache.getCache('standings')){
      this.actions.getStandingsSuccess(cache.getCache('standings'));
    }else{
      $.ajax({ url: '/api/standings/'+epochDate })
      .done(data => {
        this.actions.getStandingsSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getStandingsFail(jqXhr.responseJSON.message);
      });
    }
  }
}

export default alt.createActions(StandingsActions);

import alt from '../alt';

class StandingsActions {
  constructor() {
    this.generateActions(
      'getStandingsSuccess',
      'getStandingsFail'
    );
  }

  getStandings(){
    $.ajax({ url: '/api/standings' })
      .done(data => {
        this.actions.getStandingsSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getStandingsFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(StandingsActions);

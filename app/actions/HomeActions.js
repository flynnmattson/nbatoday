import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getScoreboardSuccess',
      'getScoreboardFail'
    );
  }

  getScoreboard(){
    $.ajax({ url: '/api/scoreboard' })
      .done(data => {
        this.actions.getScoreboardSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getScoreboardFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(HomeActions);

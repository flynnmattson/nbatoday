import alt from '../alt';

class GameActions {
  constructor() {
    this.generateActions(
      'getGameSuccess',
      'getGameFail'
    );
  }

  getGame(gameId){
    $.ajax({ url: '/api/game/'+gameId })
      .done(data => {
        this.actions.getGameSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getGameFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(GameActions);

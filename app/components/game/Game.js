import React from 'react';
import GameStore from '../../stores/game/GameStore';
import GameActions from '../../actions/game/GameActions';
import LiveGame from './LiveGame.js';
import PostGame from './PostGame.js';

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = GameStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    GameStore.listen(this.onChange);
    GameActions.getGameSummary(this.props.params.gameId);
  }

  componentWillUnmount(){
    GameStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  render(){
    let homeTeam = {},
        visitorTeam = {};
    if(this.state.gameScore.length){
      if(this.state.gameScore[0].TEAM_ID === this.state.gameSummary.HOME_TEAM_ID){
        homeTeam = this.state.gameScore[0];
        visitorTeam = this.state.gameScore[1];
      }else{
        homeTeam = this.state.gameScore[1];
        visitorTeam = this.state.gameScore[0];
      }
    }
    if(parseInt(this.props.params.statusId) === 1){ // Game has yet to start
      var detailSection = null;
    }else if(parseInt(this.props.params.statusId) === 2){ // Game is in progress
      var detailSection = <LiveGame gameId={this.props.params.gameId} />;
    }else{ // Game has finished
      var detailSection = <PostGame gameId={this.props.params.gameId} />;
    }

    return (
      <div className='row card teamCard'>
        <div className='col-xs-5 col-sm-5 col-md-5 text-center fadeInUp animated'>
          <img className='team-img' type='image/svg+xml' src={'http://stats.nba.com/media/img/teams/logos/'+visitorTeam.TEAM_ABBREVIATION+'_logo.svg'} />
          <h2>{visitorTeam.TEAM_CITY_NAME} {visitorTeam.TEAM_NICKNAME}</h2>
          <h1>{(visitorTeam.PTS !== null ? visitorTeam.PTS : '-')}</h1>
        </div>
        <div className='col-xs-2 col-sm-2 col-md-2 text-center' style={{bottom:0}}>
          <h1>@</h1>
          <br />
          <h2>{(this.state.gameSummary.LIVE_PC_TIME && this.state.gameSummary.LIVE_PC_TIME.trim() !== '' ? this.state.gameSummary.LIVE_PC_TIME.trim()+' in ' : '')}{this.state.gameSummary.GAME_STATUS_TEXT}</h2>
        </div>
        <div className='col-xs-5 col-sm-5 col-md-5 text-center fadeInUp animated'>
          <img className='team-img' type='image/svg+xml' src={'http://stats.nba.com/media/img/teams/logos/'+homeTeam.TEAM_ABBREVIATION+'_logo.svg'} />
          <h2>{homeTeam.TEAM_CITY_NAME} {homeTeam.TEAM_NICKNAME}</h2>
          <h1>{(homeTeam.PTS !== null ? homeTeam.PTS : '-')}</h1>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-12 fadeInUp animated'>
          {detailSection}
        </div>
      </div>
    );
  }
}

export default Game;

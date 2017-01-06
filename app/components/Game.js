import React from 'react';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = GameStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    GameStore.listen(this.onChange);
    GameActions.getGame(this.props.params.id);
  }

  componentWillUnmount(){
    GameStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  render(){
    console.log(this.state.teamStats);
    var teamCards = this.state.teamStats.map((team, index) => {
      return (
        <div key={team.TEAM_ID} className='col-xs-6 col-sm-6 col-md-6 text-center fadeInUp animated card teamCard'>
          <img className='team-img' type='image/svg+xml' src={'http://stats.nba.com/media/img/teams/logos/'+team.TEAM_ABBREVIATION+'_logo.svg'} />
          <h2>{team.TEAM_CITY} {team.TEAM_NAME}</h2>
          <h1>{(team.PTS !== null ? team.PTS : '-')}</h1>
          <table className='table table-bordered'>
            <thead>
            </thead>
            { team.PTS !== null ?
                <tbody>
                  <tr>
                    <td><b>Field Goals</b></td>
                    <td>{team.FGM}/{team.FGA} - {(team.FG_PCT*100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td><b>3P Field Goals</b></td>
                    <td>{team.FG3M}/{team.FG3A} - {(team.FG3_PCT*100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td><b>Free Throws</b></td>
                    <td>{team.FTM}/{team.FTA} - {(team.FT_PCT*100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td><b>Rebounds</b></td>
                    <td>{team.OREB} Offensive - {team.DREB} Defensive</td>
                  </tr>
                  <tr>
                    <td><b>Assists</b></td>
                    <td>{team.AST}</td>
                  </tr>
                  <tr>
                    <td><b>Turnovers</b></td>
                    <td>{team.TO}</td>
                  </tr>
                </tbody>
                :
                <tbody>
                  <tr>
                    <td><b>Field Goals</b></td>
                    <td>0/0 - 0%</td>
                  </tr>
                  <tr>
                    <td><b>3P Field Goals</b></td>
                    <td>0/0 - 0%</td>
                  </tr>
                  <tr>
                    <td><b>Free Throws</b></td>
                    <td>0/0 - 0%</td>
                  </tr>
                  <tr>
                    <td><b>Rebounds</b></td>
                    <td>0 Offensive - 0 Defensive</td>
                  </tr>
                  <tr>
                    <td><b>Assists</b></td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td><b>Turnovers</b></td>
                    <td>0</td>
                  </tr>
                </tbody>
            }
          </table>
        </div>
      );
    });

    return (
      <div className='row'>
        {teamCards}
      </div>
    );
  }
}

export default Game;

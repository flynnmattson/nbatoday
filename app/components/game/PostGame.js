import React from 'react';
import PostGameStore from '../../stores/game/PostGameStore';
import PostGameActions from '../../actions/game/PostGameActions';

class PostGame extends React.Component{
  constructor(props){
    super(props);
    this.state = PostGameStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    PostGameStore.listen(this.onChange);
    PostGameActions.getGame(this.props.gameId);
  }

  componentWillUnmount(){
    PostGameStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  render(){
    var teamCards = this.state.teamStats.map((team, index) => {
      return (
        <div key={team.TEAM_ID} className='col-xs-6 col-sm-6 col-md-6 text-center fadeInUp animated card teamCard'>
          <table className='table table-bordered'>
            <thead>
            </thead>
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

export default PostGame;

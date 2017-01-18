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

  changeTab(tabState){
    PostGameActions.changeTab(tabState);
  }

  render(){
    var currentCard = null,
        teamCards = this.state.teamStats.map((team, index) => {
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
        }),
      players = this.state.playerStats.map((player, index) => {
        return (
          player.PTS === null ?
            <tr key={player.PLAYER_ID}>
              <td className='sm-stat'>{player.START_POSITION}</td>
              <td className='name'>{player.PLAYER_NAME}</td>
              <td style={{width:'980px'}}>{player.COMMENT.trim()}</td>
            </tr>
          :
            <tr key={player.PLAYER_ID}>
              <td className='sm-stat'>{player.START_POSITION}</td>
              <td className='name'>{player.PLAYER_NAME}</td>
              <td className='md-stat'>{player.MIN}</td>
              <td className='sm-stat'>{player.PTS}</td>
              <td className='sm-stat'>{player.REB}</td>
              <td className='sm-stat'>{player.AST}</td>
              <td className='sm-stat'>{player.BLK}</td>
              <td className='sm-stat'>{player.STL}</td>
              <td className='sm-stat'>{player.TO}</td>
              <td className='md-stat'>{player.FGM}/{player.FGA}</td>
              <td className='md-stat'>{(player.FG_PCT*100).toFixed(1)}%</td>
              <td className='md-stat'>{player.FG3M}/{player.FG3A}</td>
              <td className='md-stat'>{(player.FG3_PCT*100).toFixed(1)}%</td>
              <td className='md-stat'>{player.FTM}/{player.FTA}</td>
              <td className='md-stat'>{(player.FT_PCT*100).toFixed(1)}%</td>
              <td className='sm-stat'>{player.PLUS_MINUS}</td>
            </tr>
        );
      });


    if(this.state.tabState === 'Player'){
      currentCard = (
        <div className='col-xs-12 col-sm-12 col-md-12'>
          <table className='table-fixed'>
            <thead>
              <tr>
                <th className='sm-stat'>POS</th>
                <th className='name'>NAME</th>
                <th className='md-stat'>MIN</th>
                <th className='sm-stat'>PTS</th>
                <th className='sm-stat'>REB</th>
                <th className='sm-stat'>AST</th>
                <th className='sm-stat'>BLK</th>
                <th className='sm-stat'>STL</th>
                <th className='sm-stat'>TO</th>
                <th className='md-stat'>FGM/FGA</th>
                <th className='md-stat'>FG%</th>
                <th className='md-stat'>3FGM/3FGA</th>
                <th className='md-stat'>3PT FG%</th>
                <th className='md-stat'>FTM/FTA</th>
                <th className='md-stat'>FT%</th>
                <th className='sm-stat'>+/-</th>
              </tr>
            </thead>
          </table>
          <div className='pane-vScroll'>
            <table className='table-fixed table-striped'>
              <tbody>
                {players}
              </tbody>
            </table>
          </div>
        </div>
      );
    }else{
      currentCard = teamCards;
    }


    // <table className='table table-striped table-fixed'>
    // </table>

    return (
      <div className='row'>
        <ul className='nav nav-tabs text-center'>
          <li className={this.state.tabState === 'Player' ? 'nav-item active' : 'nav-item'} style={{marginLeft:'10px'}}>
            <a className='nav-link' onClick={this.changeTab.bind(this, 'Player')} href='#'>Player</a>
          </li>
          <li className={this.state.tabState === 'Team' ? 'nav-item active' : 'nav-item'}>
            <a className='nav-link' onClick={this.changeTab.bind(this, 'Team')} href='#'>Team</a>
          </li>
        </ul>
        <div className='col-xs-12 col-sm-12 col-md-12' style={{paddingBottom:'50px'}}>
          <div className='row'>
            {currentCard}
          </div>
        </div>
      </div>
    );
  }
}

export default PostGame;

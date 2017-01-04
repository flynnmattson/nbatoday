import React from 'react';
import StandingsStore from '../stores/StandingsStore';
import StandingsActions from '../actions/StandingsActions';

class Standings extends React.Component{
  constructor(props){
    super(props);
    this.state = StandingsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    StandingsStore.listen(this.onChange);
    StandingsActions.getStandings();
  }

  componentWillUnmount(){
    StandingsStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  render(){
    var east = this.state.eastStandings.map((team, index) => {
      return (
        <tr key={team.TEAM_ID}>
          <td className='text-left'>{team.TEAM}</td>
          <td>{team.W+'-'+team.L}</td>
        </tr>
      );
    });

    var west = this.state.westStandings.map((team, index) => {
      return (
        <tr key={team.TEAM_ID}>
          <td className='text-left'>{team.TEAM}</td>
          <td>{team.W+'-'+team.L}</td>
        </tr>
      );
    });

    return (
      <div className='text-center fadeInUp animated'>
        <div className='panel panel-default'>
          <div className='panel-heading'>East Standings</div>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <td><b>Team</b></td>
                <td><b>Record</b></td>
              </tr>
            </thead>
            <tbody>
              {east}
            </tbody>
          </table>
        </div>
        <div className='panel panel-default'>
          <div className='panel-heading'>West Standings</div>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <td><b>Team</b></td>
                <td><b>Record</b></td>
              </tr>
            </thead>
            <tbody>
              {west}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Standings;

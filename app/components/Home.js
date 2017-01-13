import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
import Standings from './Standings';
import Constants from '../constants.json';
import moment from 'moment-timezone';
import helper from '../helper';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
    this.refreshScoreboard = this.refreshScoreboard.bind(this, +this.state.pickedDate);
  }

  refreshScoreboard(epochDate){
    HomeActions.getScoreboard(epochDate);
  }

  componentDidMount(){
    HomeStore.listen(this.onChange);
    HomeActions.getScoreboard(+this.state.pickedDate);
    // Set interval to continually refresh the scoreboard every minute for the user.
    // var intervalId = setInterval(this.refreshScoreboard, 60000);
    // this.setState({intervalId: intervalId});
  }

  componentWillUnmount(){
    // clearInterval(this.state.intervalId);
    HomeStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  changeDate(changeAmt){
    HomeActions.changeDate(+this.state.pickedDate+changeAmt);
    HomeActions.getScoreboard(+this.state.pickedDate+changeAmt);
  }

  render(){
    var gameScores = this.state.scoreboard.map((sb, index) => {
      return (
        <div key={sb.GAME_ID} className={index % 2 === 0 ? 'col-xs-12 col-sm-12 col-md-5 col-md-offset-1' : 'col-xs-12 col-sm-12 col-md-5'}>
          <div className='row card scoreboard fadeInUp animated'>
            {sb.GAME_STATUS_ID === 3 ?
              <Link to={'/game/'+sb.GAME_ID+'/'+sb.GAME_STATUS_ID}>
                <div key={sb.HOME_TEAM_ID} className='col-xs-5 col-sm-5 col-md-5 col-md-offset-1 col-xs-offset-1 cardLeft text-center' style={{backgroundColor: '#'+Constants[sb.homeTeam.TEAM_ABBREVIATION].colors[0], border: '4px solid #'+Constants[sb.homeTeam.TEAM_ABBREVIATION].colors[1]}}>
                  <img className='team-img' type='image/svg+xml' src={'http://stats.nba.com/media/img/teams/logos/'+sb.homeTeam.TEAM_ABBREVIATION+'_logo.svg'} />
                  <h1 style={{color:'#'+Constants[sb.homeTeam.TEAM_ABBREVIATION].colors[1], marginTop:'10px'}}>{sb.homeTeam.TEAM_ABBREVIATION}</h1>
                  <h2 style={{color:'#'+Constants[sb.homeTeam.TEAM_ABBREVIATION].colors[1]}}>{sb.homeTeam.PTS !== null ? sb.homeTeam.PTS : '-'}</h2>
                </div>
                <div key={sb.VISITOR_TEAM_ID} className='col-xs-5 col-sm-5 col-md-5 text-center' style={{backgroundColor: '#'+Constants[sb.visitorTeam.TEAM_ABBREVIATION].colors[0], border: '4px solid #'+Constants[sb.visitorTeam.TEAM_ABBREVIATION].colors[1]}}>
                  <img className='team-img' type='image/svg+xml' src={'http://stats.nba.com/media/img/teams/logos/'+sb.visitorTeam.TEAM_ABBREVIATION+'_logo.svg'} />
                  <h1 style={{color:'#'+Constants[sb.visitorTeam.TEAM_ABBREVIATION].colors[1], marginTop:'10px'}}>{sb.visitorTeam.TEAM_ABBREVIATION}</h1>
                  <h2 style={{color:'#'+Constants[sb.visitorTeam.TEAM_ABBREVIATION].colors[1]}}>{sb.visitorTeam.PTS !== null ? sb.visitorTeam.PTS : '-'}</h2>
                </div>
                <div className='col-xs-12 col-sm-12 col-md-12 text-center'>
                  {(sb.LIVE_PC_TIME && sb.LIVE_PC_TIME.trim() !== '' ? sb.LIVE_PC_TIME.trim()+' in ' : '')}
                  {sb.GAME_STATUS_TEXT}
                  {(sb.NATL_TV_BROADCASTER_ABBREVIATION ? ' on '+sb.NATL_TV_BROADCASTER_ABBREVIATION : '')}
                  {' - @'+sb.homeTeam.TEAM_CITY_NAME}
                </div>
              </Link>
              :
              <span>
                <div key={sb.HOME_TEAM_ID} className='col-xs-5 col-sm-5 col-md-5 col-md-offset-1 col-xs-offset-1 cardLeft text-center' style={{backgroundColor: '#'+Constants[sb.homeTeam.TEAM_ABBREVIATION].colors[0], border: '4px solid #'+Constants[sb.homeTeam.TEAM_ABBREVIATION].colors[1]}}>
                  <img className='team-img' type='image/svg+xml' src={'http://stats.nba.com/media/img/teams/logos/'+sb.homeTeam.TEAM_ABBREVIATION+'_logo.svg'} />
                  <h1 style={{color:'#'+Constants[sb.homeTeam.TEAM_ABBREVIATION].colors[1], marginTop:'10px'}}>{sb.homeTeam.TEAM_ABBREVIATION}</h1>
                  <h2 style={{color:'#'+Constants[sb.homeTeam.TEAM_ABBREVIATION].colors[1]}}>{sb.homeTeam.PTS !== null ? sb.homeTeam.PTS : '-'}</h2>
                </div>
                <div key={sb.VISITOR_TEAM_ID} className='col-xs-5 col-sm-5 col-md-5 text-center' style={{backgroundColor: '#'+Constants[sb.visitorTeam.TEAM_ABBREVIATION].colors[0], border: '4px solid #'+Constants[sb.visitorTeam.TEAM_ABBREVIATION].colors[1]}}>
                  <img className='team-img' type='image/svg+xml' src={'http://stats.nba.com/media/img/teams/logos/'+sb.visitorTeam.TEAM_ABBREVIATION+'_logo.svg'} />
                  <h1 style={{color:'#'+Constants[sb.visitorTeam.TEAM_ABBREVIATION].colors[1], marginTop:'10px'}}>{sb.visitorTeam.TEAM_ABBREVIATION}</h1>
                  <h2 style={{color:'#'+Constants[sb.visitorTeam.TEAM_ABBREVIATION].colors[1]}}>{sb.visitorTeam.PTS !== null ? sb.visitorTeam.PTS : '-'}</h2>
                </div>
                <div className='col-xs-12 col-sm-12 col-md-12 text-center'>
                  {(sb.LIVE_PC_TIME && sb.LIVE_PC_TIME.trim() !== '' ? sb.LIVE_PC_TIME.trim()+' in ' : '')}
                  {sb.GAME_STATUS_TEXT}
                  {(sb.NATL_TV_BROADCASTER_ABBREVIATION ? ' on '+sb.NATL_TV_BROADCASTER_ABBREVIATION : '')}
                  {' - @'+sb.homeTeam.TEAM_CITY_NAME}
                </div>
              </span>
            }
          </div>
        </div>
      );
    });

    return (
      <div className='row'>
        <div className='col-xs-10 col-sm-10 col-md-10'>
          <div className='col-xs-12 col-sm-12 col-md-12 text-center'>
            <div className='row'>
              <button className='btn btn-transparent glyphicon glyphicon-chevron-left'
                      onClick={this.changeDate.bind(this, -this.state.oneDay)}></button>
              <span className='datePicker'>{this.state.pickedDate.format('M/D/YYYY')}</span>
              <button className='btn btn-transparent glyphicon glyphicon-chevron-right' onClick={this.changeDate.bind(this, +this.state.oneDay)} disabled={+this.state.pickedDate === +this.state.todaysDate}></button>
            </div>
          </div>
          {gameScores}
        </div>
        <div className='col-xs-2 col-sm-2 col-md-2 standings'>
          <Standings />
        </div>
      </div>
    );
  }
}

export default Home;

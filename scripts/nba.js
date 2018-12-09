const HTTP = require('http');
const Promise = require('promise');
const moment = require('moment-timezone');

// APIS I know that work:
//  boxscoreadvancedv2
//  boxscorefourfactorsv2
//  boxscoremiscv2
//  boxscoreplayertrackv2
//  boxscorescoringv2
//  boxscoresummaryv2
//  boxscoretraditionalv2 !!!!
//  boxscoreusagev2
// APIS I know that don't work (tested on game that finished with all params being 0):
//  boxscoreadvanced
//  boxscore
//  boxscorefourfactors
//  shotchart

function Nba(){
  this.statusCode = 400;
  this.options = {
    host : 'stats.nba.com',
    path : '',
    headers : {
      // 'Referer' : 'http://stats.nba.com/scores/',
      // 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
      // 'Accept-Language': 'en-US,en;q=0.8,af;q=0.6',
      // 'Accept-Encoding': 'gzip, deflate, sdch',
      // 'Dnt': '1',
      // 'origin': 'http://stats.nba.com'
      'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
      'Dnt': '1',
      'Accept-Encoding': 'gzip, deflate, sdch',
      'Accept-Language': 'en',
      'origin': 'http://stats.nba.com'
    }
  };
  this.getData = function(path, callback){
    this.options.path = path;
    HTTP.get(this.options, (res) => {
      let rawData = '';
      res.setEncoding('utf8');
      this.statusCode = res.statusCode;

      if(res.statusCode !== 200){
        console.log('Error: failed to retrieve data from nba script, status code '+this.statusCode);
        res.resume();
      }

      res.on('data', (chunk) => rawData += chunk);
      res.on('end', () => {
        try{
          console.log(rawData);
          callback(JSON.parse(rawData));
        }catch(e){
          console.log(e.message);
          callback(null, e);
        }
      });
    }).on('error', (e) => {
      console.log(e.message);
      callback(null, e);
    });
  }
}

Nba.prototype.getScoreboard = function(theDate, callback){
  let dateString = moment(theDate).tz('US/Pacific').format('M/D/YYYY');
  function processData(data){
    var gameHeaders = data.resultSets[0].headers,
        gameHeadersData = data.resultSets[0].rowSet,
        lineHeaders = data.resultSets[1].headers,
        lineData = data.resultSets[1].rowSet,
        games = [],
        temp = {};
    for(let i=0; i<gameHeadersData.length; i++){
      temp = {};
      for(let j=0; j<gameHeaders.length; j++){
        temp[gameHeaders[j]] = gameHeadersData[i][j];
      }
      games.push(temp);
    }
    for(let i=0; i<lineData.length; i++){
      temp = {};
      for(let j=0; j<lineHeaders.length; j++){
        temp[lineHeaders[j]] = lineData[i][j];
      }
      for(let j=0; j<games.length; j++){
        if(games[j].HOME_TEAM_ID === temp.TEAM_ID)
        games[j].homeTeam = temp;
        else if(games[j].VISITOR_TEAM_ID === temp.TEAM_ID)
        games[j].visitorTeam = temp;
      }
    }
    return games;
  }
  this.getData('/stats/scoreboard/?GameDate='+dateString+'&LeagueID=00&DayOffset=0', function(result, err){
    if(err && !result){callback(null, err);}
    else{callback(processData(result));}
  });
}

Nba.prototype.getStandings = function(theDate, callback){
  let dateString = moment(theDate).tz('US/Pacific').format('M/D/YYYY');
  function processData(standingsObj){
    var standings = [];
    let temp = {};
    for(let i=0; i<standingsObj.rowSet.length; i++){
      temp = {};
      for(let j=0; j<standingsObj.headers.length; j++){
        temp[standingsObj.headers[j]] = standingsObj.rowSet[i][j];
      }
      standings.push(temp);
    }
    return standings;
  }
  this.getData('/stats/scoreboard/?GameDate='+dateString+'&LeagueID=00&DayOffset=0', function(result, err){
    if(err && !result){callback(null, err);}
    else{
      callback({
        east : processData(result.resultSets[4]),
        west : processData(result.resultSets[5])
      });
    }
  });
}

// NOTE: ONLY WORKS AFTER THE GAME
Nba.prototype.getBoxscoreSummary = function(gameId, callback){
  function processData(gameObj){
    var stats = [];
    let temp = {};
    for(let i=0; i<gameObj.rowSet.length; i++){
      temp = {};
      for(let j=0; j<gameObj.headers.length; j++){
        temp[gameObj.headers[j]] = gameObj.rowSet[i][j];
      }
      stats.push(temp);
    }
    return stats;
  }
  this.getData('/stats/boxscoresummaryv2/?GameID='+gameId, function(result, err){
    if(err && !result){callback(null, err);}
    else{
      callback({
        summary: processData(result.resultSets[0]),
        score: processData(result.resultSets[5])
      });
    }
  });
}

// NOTE: ONLY WORKS AFTER THE GAME
Nba.prototype.getBoxscore = function(gameId, callback){
  let params = 'GameID='+gameId+'&StartPeriod=0&EndPeriod=0&StartRange=0&EndRange=0&RangeType=0';
  function processData(gameObj){
    var stats = [];
    let temp = {};
    for(let i=0; i<gameObj.rowSet.length; i++){
      temp = {};
      for(let j=0; j<gameObj.headers.length; j++){
        temp[gameObj.headers[j]] = gameObj.rowSet[i][j];
      }
      stats.push(temp);
    }
    return stats;
  }
  this.getData('/stats/boxscoretraditionalv2/?'+params, function(result, err){
    if(err && !result){callback(null, err);}
    else{
      callback({
        player_stats: processData(result.resultSets[0]),
        team_stats: processData(result.resultSets[1])
      });
    }
  });
}

// NOTE: ONLY WORKS AFTER THE GAME
Nba.prototype.getPlaybyPlay = function(gameId, callback){
  let params = 'GameID='+gameId+'&StartPeriod=0&EndPeriod=0';
  function processData(gameObj){
    var stats = [];
    let temp = {};
    for(let i=0; i<gameObj.rowSet.length; i++){
      temp = {};
      for(let j=0; j<gameObj.headers.length; j++){
        temp[gameObj.headers[j]] = gameObj.rowSet[i][j];
      }
      stats.push(temp);
    }
    return stats;
  }
  this.getData('/stats/playbyplayv2/?'+params, function(result, err){
    if(err && !result){callback(null, err);}
    else{callback(processData(result));}
  });
}

module.exports = Nba;

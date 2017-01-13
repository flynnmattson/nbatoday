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

function Nba(){
  this.statusCode = 400;
  this.options = {
    host : 'stats.nba.com',
    path : '',
    headers : {
      'Referer' : 'http://stats.nba.com/scores/',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
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
  this.getData('/stats/scoreboard/?GameDate='+dateString+'&LeagueID=00&DayOffset=0', function(result, err){
    if(err && !result){callback(null, err);}
    else{callback(result);}
  });
}

// NOTE: ONLY WORKS AFTER THE GAME
Nba.prototype.getBoxscoreSummary = function(gameId, callback){
  this.getData('/stats/boxscoresummaryv2/?GameID='+gameId, function(result, err){
    if(err && !result){callback(null, err);}
    else{callback(result);}
  });
}

// NOTE: ONLY WORKS AFTER THE GAME
Nba.prototype.getBoxscore = function(gameId, callback){
  let params = 'GameID='+gameId+'&StartPeriod=0&EndPeriod=0&StartRange=0&EndRange=0&RangeType=0';
  this.getData('/stats/boxscoretraditionalv2/?'+params, function(result, err){
    if(err && !result){callback(null, err);}
    else{callback(result);}
  });
}

// NOTE: ONLY WORKS AFTER THE GAME
Nba.prototype.getPlaybyPlay = function(gameId, callback){
  let params = 'GameID='+gameId+'&StartPeriod=0&EndPeriod=0';
  this.getData('/stats/playbyplayv2/?'+params, function(result, err){
    if(err && !result){callback(null, err);}
    else{callback(result);}
  });
}

module.exports = Nba;

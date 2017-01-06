const HTTP = require('http');
const Promise = require('promise');

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

function Boxscore(){
    this.statusCode = 400;
    this.results = {};
    this.host = 'stats.nba.com';
}

Boxscore.prototype.getBoxscoreSummary = function(gameId, callback){
  // let params = 'GameID='+gameId+''
  let options = {
    host : this.host,
    path : '/stats/boxscoresummaryv2/?GameID='+gameId,
    headers : {
      'Referer' : 'http://stats.nba.com/scores/'
    }
  };

  HTTP.get(options, (res) => {
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
        this.results['boxscore_summary'] = JSON.parse(rawData);
        callback();
      }catch(e){
        console.log(e.message);
        callback(e);
      }
    });
  }).on('error', (e) => {
    console.log(e.message);
    callback(e);
  });
}

Boxscore.prototype.getBoxscore = function(gameId, callback){
  var params = 'GameID='+gameId+'&StartPeriod=0&EndPeriod=0&StartRange=0&EndRange=0&RangeType=0',
      options = {
        host : this.host,
        path : '/stats/boxscoretraditionalv2/?'+params,
        headers : {
          'Referer' : 'http://stats.nba.com/scores/'
        }
      };

  HTTP.get(options, (res) => {
    let rawData = '';
    res.setEncoding('utf8');
    this.statusCode = res.statusCode;

    if(res.statusCode !== 200){
      console.log('Error: failed to retrieve data from nba script, status code '+this.statusCode);
      res.resume();
    }

    res.on('data', (chunk) => {rawData += chunk});
    res.on('end', () => {
      try{
        this.results['boxscore'] = JSON.parse(rawData);
        callback();
      }catch(e){
        console.log(e.message);
        callback(e);
      }
    });
  }).on('error', (e) => {
    console.log(e.message);
    callback(e);
  });
}

Boxscore.prototype.getPlaybyPlay = function(gameId, callback){
  var params = 'GameID='+gameId+'&StartPeriod=0&EndPeriod=0',
      options = {
        host : this.host,
        path : '/stats/playbyplayv2/?'+params,
        headers : {
          'Referer' : 'http://stats.nba.com/scores/'
        }
      };

  HTTP.get(options, (res) => {
    let rawData = '';
    res.setEncoding('utf8');
    this.statusCode = res.statusCode;

    if(res.statusCode !== 200){
      console.log('Error: failed to retrieve data from nba script, status code '+this.statusCode);
      res.resume();
    }

    res.on('data', (chunk) => {rawData += chunk});
    res.on('end', () => {
      try{
        this.results['play_by_play'] = JSON.parse(rawData);
        callback();
      }catch(e){
        console.log(e.message);
        callback(e);
      }
    });
  }).on('error', (e) => {
    console.log(e.message);
    callback(e);
  });
}

module.exports = Boxscore;

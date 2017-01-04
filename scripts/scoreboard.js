const HTTP = require('http');
const Promise = require('promise');

function Scoreboard(){
    this.statusCode = 400;
    this.results = {};
    this.host = 'stats.nba.com';
}

Scoreboard.prototype.getScoreboard = function(gameDate, callback){
  let dateString = (gameDate.getMonth()+1)+'/'+gameDate.getDate()+'/'+gameDate.getFullYear();
  let options = {
    host : this.host,
    path : '/stats/scoreboard/?GameDate='+dateString+'&LeagueID=00&DayOffset=0',
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
        this.results['scoreboard'] = JSON.parse(rawData);
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

module.exports = Scoreboard;

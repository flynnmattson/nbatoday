const Promise = require('promise');
const SCOREBOARD = require('./scripts/scoreboard');
const BOXSCORE = require('./scripts/boxscore');
var scoreBoard = new SCOREBOARD(),
    boxScore = new BOXSCORE();

function expressRoutes(app){
  /**
   * GET /api/scoreboard
   * Returns array of live games and their scores along with other team info on the games.
   */
  app.get('/api/scoreboard', function(req, res, next) {
    function processData(){
      var gameHeaders = scoreBoard.results['scoreboard'].resultSets[0].headers,
          gameHeadersData = scoreBoard.results['scoreboard'].resultSets[0].rowSet,
          lineHeaders = scoreBoard.results['scoreboard'].resultSets[1].headers,
          lineData = scoreBoard.results['scoreboard'].resultSets[1].rowSet,
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

    scoreBoard.getScoreboard(new Date(), (err) => {
      if(scoreBoard.statusCode === 200 && !err){
        res.send(processData());
      }else{
        return next(err);
      }
    });
  });

  /**
   * GET /api/standings
   * Returns the standings for both eastern and western conferences.
   */
  app.get('/api/standings', function(req, res, next) {
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

    scoreBoard.getScoreboard(new Date(), (err) => {
      if(scoreBoard.statusCode === 200 && !err){
        res.send({
          east : processData(scoreBoard.results['scoreboard'].resultSets[4]),
          west : processData(scoreBoard.results['scoreboard'].resultSets[5])
        });
      }else{
        return next(err);
      }
    });
  });

  /**
   * GET /api/game/:id
   * Returns information on both teams for a specific game
   */
  app.get('/api/game/:id', function(req, res, next) {
    var gameId = req.params.id;
    boxScore.getBoxscore(gameId, (err) => {
      if(boxScore.statusCode === 200 && !err){
        res.send(boxScore.results['boxscore']);
      }else{
        return next(err);
      }
    });
  });
}

module.exports = expressRoutes;

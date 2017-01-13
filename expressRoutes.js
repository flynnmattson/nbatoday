const Promise = require('promise');
const NBA = require('./scripts/nba');
var nba = new NBA();

function expressRoutes(app){
  /**
   * GET /api/scoreboard
   * Returns array of live games and their scores along with other team info on the games.
   */
  app.get('/api/scoreboard/:epochDate', function(req, res, next) {
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

    nba.getScoreboard(parseInt(req.params.epochDate), (result, err) => {
      if(nba.statusCode === 200 && !err && result){
        res.send(processData(result));
      }else{
        return next(err);
      }
    });
  });

  /**
   * GET /api/standings
   * Returns the standings for both eastern and western conferences.
   */
  app.get('/api/standings/:epochDate', function(req, res, next) {
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

    nba.getScoreboard(parseInt(req.params.epochDate), (result, err) => {
      if(nba.statusCode === 200 && !err && result){
        res.send({
          east : processData(result.resultSets[4]),
          west : processData(result.resultSets[5])
        });
      }else{
        return next(err);
      }
    });
  });

  /**
   * GET /api/game/:id
   * Returns information on both teams for a specific game,
   * NOTE: ONLY RETURNS DATA AFTER THE GAME
   */
  app.get('/api/game/:id', function(req, res, next) {
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
    nba.getBoxscore(req.params.id, (result, err) => {
      if(nba.statusCode === 200 && !err && result){
        res.send({
          player_stats: processData(result.resultSets[0]),
          team_stats: processData(result.resultSets[1])
        });
      }else{
        return next(err);
      }
    });
  });

  /**
   * GET /api/game_summary/:id
   * Returns summary information on both teams for a specific game
   */
  app.get('/api/game_summary/:id', function(req, res, next) {
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
    nba.getBoxscoreSummary(req.params.id, (result, err) => {
      if(nba.statusCode === 200 && !err && result){
        res.send({
          summary: processData(result.resultSets[0]),
          score: processData(result.resultSets[5])
        });
      }else{
        return next(err);
      }
    });
  });

  /**
   * GET /api/play_by_play/:id
   * Returns play by play stats for a specific game
   */
  app.get('/api/play_by_play/:id', function(req, res, next) {
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
    nba.getPlaybyPlay(req.params.id, (result, err) => {
      if(nba.statusCode === 200 && !err && result){
        res.send(result);
      }else{
        return next(err);
      }
    });
  });
}

module.exports = expressRoutes;

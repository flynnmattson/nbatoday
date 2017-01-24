const Promise = require('promise');
const NBA = require('./scripts/nba');
var nba = new NBA();

function expressRoutes(app){
  /**
   * GET /api/scoreboard
   * Returns array of live games and their scores along with other team info on the games.
   */
  app.get('/api/scoreboard/:epochDate', function(req, res, next) {
    nba.getScoreboard(parseInt(req.params.epochDate), (result, err) => {
      if(nba.statusCode === 200 && !err && result){res.send(result);}
      else{return next(err);}
    });
  });

  /**
   * GET /api/standings
   * Returns the standings for both eastern and western conferences.
   */
  app.get('/api/standings/:epochDate', function(req, res, next) {
    nba.getStandings(parseInt(req.params.epochDate), (result, err) => {
      if(nba.statusCode === 200 && !err && result){res.send(result);}
      else{return next(err);}
    });
  });

  /**
   * GET /api/game/:id
   * Returns information on both teams for a specific game,
   * NOTE: ONLY RETURNS DATA AFTER THE GAME
   */
  app.get('/api/game/:id', function(req, res, next) {
    nba.getBoxscore(req.params.id, (result, err) => {
      if(nba.statusCode === 200 && !err && result){res.send(result);}
      else{return next(err);}
    });
  });

  /**
   * GET /api/game_summary/:id
   * Returns summary information on both teams for a specific game
   */
  app.get('/api/game_summary/:id', function(req, res, next) {
    nba.getBoxscoreSummary(req.params.id, (result, err) => {
      if(nba.statusCode === 200 && !err && result){res.send(result);}
      else{return next(err);}
    });
  });

  /**
   * GET /api/play_by_play/:id
   * Returns play by play stats for a specific game
   */
  app.get('/api/play_by_play/:id', function(req, res, next) {
    nba.getPlaybyPlay(req.params.id, (result, err) => {
      if(nba.statusCode === 200 && !err && result){res.send(result);}
      else{return next(err);}
    });
  });
}

module.exports = expressRoutes;

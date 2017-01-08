import moment from 'moment-timezone';

function helper(){
  this.todaysDate = function(){
    return moment().tz('US/Pacific');
  }

  this.getDate = function(epoch){
    return moment(epoch).tz('US/Pacific');
  }
}

export default new helper();

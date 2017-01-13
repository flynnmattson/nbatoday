import React from 'react';
import LiveGameStore from '../../stores/game/LiveGameStore';
import LiveGameActions from '../../actions/game/LiveGameActions';

class LiveGame extends React.Component{
  constructor(props){
    super(props);
    this.state = LiveGameStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    LiveGameStore.listen(this.onChange);
    LiveGameActions.getPlaybyPlay(this.props.gameId);
  }

  componentWillUnmount(){
    LiveGameStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  render(){
    console.log(this.state);
    return (
      <div className='row'>
      </div>
    );
  }
}

export default LiveGame;

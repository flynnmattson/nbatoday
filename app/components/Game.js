import React from 'react';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = GameStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    GameStore.listen(this.onChange);
    GameActions.getGame(this.props.params.id);
  }

  componentWillUnmount(){
    GameStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  render(){
    console.log(this.state.game);
    return (
      <div className='text-center fadeInUp animated'>
        Game goes here!
      </div>
    );
  }
}

export default Game;

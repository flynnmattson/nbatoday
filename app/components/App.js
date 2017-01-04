import React from 'react';
import Navbar from './Navbar.js';

class App extends React.Component {
  render() {
    return (
      <div id='nba'>
        <Navbar history={this.props.history} />
        <div className='container' style={{paddingTop: '40px'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;

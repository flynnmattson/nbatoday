import React from 'react';
import Navbar from './Navbar.js';

class App extends React.Component {
  componentDidMount(){
    $(document).ajaxStart(() => {
      $('.loading').show();
      // $('.loading').css('background', 'transparent');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        $('.loading').hide();
      }, 750);
    });
  }

  render() {
    return (
      <div id='nba'>
        <div className='loading text-center'>
          <div ref='triangles' className='triangles animated fadeIn'>
            <div className='tri invert'></div>
            <div className='tri invert'></div>
            <div className='tri'></div>
            <div className='tri invert'></div>
            <div className='tri invert'></div>
            <div className='tri'></div>
            <div className='tri invert'></div>
            <div className='tri'></div>
            <div className='tri invert'></div>
          </div>
        </div>
        <Navbar history={this.props.history} />
        <div className='container' style={{paddingTop: '40px'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;

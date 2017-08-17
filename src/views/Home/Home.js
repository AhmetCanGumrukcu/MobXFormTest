import React, { Component } from 'react';
import logo from 'images/logo.svg';
import 'style/App.css';

class Home extends Component {
  constructor(props){
    super(props) 
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Shopping</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>Home.js</code> and save to reload.
        </p>        
      </div>
    );
  }
}

export default Home;

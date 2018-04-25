import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JsonContainer from './JsonContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Shoshin Code</h1>
        </header>
        <div>
          <p className="App-intro">
            Wheeee. In the beginner's mind there are many possibilities, in the expert's there are few. Shoshin.
          </p>
          <JsonContainer />
        </div>
      </div>
    );
  }
}

export default App;

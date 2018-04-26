import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import JsonContainer from './JsonContainer'
import ExerciseContainer from './components/ExerciseContainer'
import { NavigationDrawer } from 'react-md'

class App extends Component {

  render() {
    return (
    
      <NavigationDrawer
        drawerTitle=""
        toolbarTitle="Toolbar Title"
      >

        <div className="App">
          <header className="App-header" style={{"padding":".5rem 0"}} >
            <img src={logo} className="App-logo" alt="logo" style={{"padding":"1.2rem 0 0 0"}} />
            <h1 className="App-title">Welcome to Shoshin Code</h1>
          </header>
          <div>
            <p className="App-intro">
              In the beginner's mind there are many possibilities, in the expert's there are few. Shoshin.
            </p>
            <ExerciseContainer />
            <JsonContainer />
          </div>
        </div>

      </NavigationDrawer>
    );
  }
}

export default App;

import React, { Component } from 'react'

import logo from './logo.svg'


import { NavigationDrawer } from 'react-md'
import ExerciseContainer from './components/ExerciseContainer'
import JsonContainer from './JsonContainer'


// const reducer = (state={count:0}, action) => {
//   console.log('---------------')
//   console.log('state: ', state)
//   console.log('action: ', action)
//   console.log('---------------')
//   return { blah: true }
// }
// const store = createStore( reducer )
// store.subscribe( () => console.log('New state: ', store.getState() ))
// console.log('---------------')

class App extends Component {

  render() {
    return (
    
      <NavigationDrawer
        drawerTitle=""
        toolbarTitle="Toolbar Title"
      >
        <ExerciseContainer />
      </NavigationDrawer>
    );
  }
}

export default App;

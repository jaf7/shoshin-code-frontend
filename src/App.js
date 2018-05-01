import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import NavigationFrame from './NavigationFrame'

// import { NavigationDrawer } from 'react-md'
// import NavigationTabs from './components/navigation/NavigationTabs'
// import ExerciseChooser from './components/ExerciseChooser'
// import ExerciseContainer from './components/ExerciseContainer'
// import UserCollection from './components/UserCollection'


import { fetchExercises } from './actions/actions'

class App extends Component {
  constructor(props) {
    super(props) 
    this.props.getExercises()
  }

  render() {
    return (
      <NavigationFrame />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getExercises: () => dispatch( fetchExercises() )
  }
}

export default withRouter( connect( null, mapDispatchToProps )( App ) )
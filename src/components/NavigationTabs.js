import React, { Component } from 'react'
import { TabsContainer, Tabs, Tab } from 'react-md'
import { Link, withRouter } from 'react-router-dom'
// import ExerciseChooser from './ExerciseChooser'
// import ExerciseContainer from './ExerciseContainer'
// import UserCollection from './UserCollection'
import { ExerciseChooserLink, TempCurrentExerciseLink, MyExercisesLink } from './Links'


class NavigationTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true
    }
  }

  render() {

    clickHandler = () => {this.setState({ active: !this.state.active})}

    return (
      

        <Tabs
          tabId="navigation"
          className="navigation-tabs"
          alignToKeyline={false}
          centered={true}
          mobile={false}
        >
          <Tab component={ExerciseChooserLink} label="Exercises" className="nav-tab" ></Tab>
          <Tab component={TempCurrentExerciseLink} label="Code It" className="nav-tab" ></Tab>
          <Tab component={MyExercisesLink} label="My Exercises" className="nav-tab" ></Tab>
        </Tabs>

    )
  }
}

export default NavigationTabs
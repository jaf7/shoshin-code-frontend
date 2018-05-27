import React, { Component } from 'react'
import { Tabs, Tab } from 'react-md'
import { ExerciseChooserLink, DefaultExerciseLink, MyExercisesLink } from './NavigationTabLinks'


class NavigationTabs extends Component {

   

  render() {

    return (
      
        <Tabs
          tabId="navigation"
          className="navigation-tabs"
          alignToKeyline={false}
          centered={true}
          mobile={false}
        >
          <Tab component={ExerciseChooserLink} id="exercise-chooser-tab" label="Exercises" className="nav-tab" ></Tab>
          <Tab component={DefaultExerciseLink} id="current-exercise-tab" label="Code It" className="nav-tab" ></Tab>
        </Tabs>

    )
  }
}

export default NavigationTabs


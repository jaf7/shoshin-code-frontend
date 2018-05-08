import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ExerciseChooserLink extends Component {
  constructor () {
    super()
    this.state = { active: false }
  }

  tabClick = ( e ) => {
    this.setState({active: !this.state.active})
    console.log('------------------')
    console.log('tabClick target: ', e.target)
    console.log('state: ', this.state.active)
    console.log('------------------')
  }

  render() {
    return ( 
      <div>
        {
          this.state.active ? 
          <li id="navigation-0" role="tab" aria-controls="navigation-panel-0" aria-selected="false" className="override-tab-li md-fake-btn md-pointer--hover md-fake-btn--no-outline md-tab md-tab--inactive nav-tab" tabIndex="0">
            <Link to="/exercise-chooser" className="override-tab-label" onClick={this.tabClick} >
              <div className="md-ink-container"></div>
              <div id="ex_chooser_tab" className="override-tab-label">Exercises</div>
            </Link>
          </li>
          :
          <li id="navigation-0" role="tab" aria-controls="navigation-panel-0" aria-selected="false" className="override-tab-li md-fake-btn md-pointer--hover md-fake-btn--no-outline md-tab md-tab--active nav-tab" tabIndex="0">
            <Link to="/exercise-chooser" className="override-tab-label" onClick={this.tabClick} >
              <div className="md-ink-container"></div>
              <div id="ex_chooser_tab" className="override-tab-label">Exercises</div>
            </Link>
          </li>
        }
      </div>
    )
  }
}

class DefaultExerciseLink extends Component {
  constructor () {
    super()
    this.state = { active: false }
  }

  tabClick = ( e ) => {
    this.setState({active: !this.state.active})
    console.log('------------------') 
    console.log('tabClick target: ', e.target)
    console.log('state: ', this.state.active)
    console.log('------------------')
  }

  render() {
    return (
      <div>
        {
          this.state.active ? 
          <li id="navigation-1" role="tab" aria-controls="navigation-panel-1" aria-selected="true" className="override-tab-li md-fake-btn md-pointer--hover md-fake-btn--no-outline md-tab md-tab--inactive nav-tab" tabIndex="1">
            <Link to="/default-exercise" className="override-tab-label" onClick={this.tabClick} >
              <div className="md-ink-container"></div>
              <div id="ex_current_tab" className="override-tab-label">Code It</div>
            </Link>
          </li>
          :
          <li id="navigation-1" role="tab" aria-controls="navigation-panel-1" aria-selected="true" className="override-tab-li md-fake-btn md-pointer--hover md-fake-btn--no-outline md-tab md-tab--active nav-tab" tabIndex="1">
            <Link to="/default-exercise" className="override-tab-label" onClick={this.tabClick} >
              <div className="md-ink-container"></div>
              <div id="ex_current_tab" className="override-tab-label">Code It</div>
            </Link>
          </li>
        }
      </div>
    )
  }
}

class MyExercisesLink extends Component {
  constructor () {
    super()
    this.state = { active: false }
  }

  tabClick = ( e ) => {
    this.setState({active: !this.state.active})
    console.log('------------------')
    console.log('tabClick target: ', e.target)
    console.log('state: ', this.state.active)
    console.log('------------------')
  }

  render() {
    return (
      <div>
        {
          this.state.active ? 
          <li id="navigation-2" role="tab" aria-controls="navigation-panel-2" aria-selected="false" className="override-tab-li md-fake-btn md-pointer--hover md-fake-btn--no-outline md-tab md-tab--inactive nav-tab" tabIndex="2">
            <Link to="/my-exercises" className="override-tab-label" onClick={this.tabClick} >
              <div className="md-ink-container"></div>
              <div id="ex_my_tab" className="override-tab-label">My Exercises</div>
            </Link>
          </li>
          :
          <li id="navigation-2" role="tab" aria-controls="navigation-panel-2" aria-selected="false" className="override-tab-li md-fake-btn md-pointer--hover md-fake-btn--no-outline md-tab md-tab--active nav-tab" tabIndex="2">
            <Link to="/my-exercises" className="override-tab-label" onClick={this.tabClick} >
              <div className="md-ink-container"></div>
              <div id="ex_my_tab" className="override-tab-label">My Exercises</div>
            </Link>
          </li>
        }
      </div>
    )
  }
}

export { ExerciseChooserLink, DefaultExerciseLink, MyExercisesLink }


import React, { Component, PureComponent } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux' 
import MainContainer from './MainContainer'
import { fetchExercises, fetchUser, getUserExerciseCollection } from './actions/actions'

class App extends PureComponent {

  componentDidMount() {
    if ( this.props.data.length === 0 ) {
      this.props.getExercises()
    }
    const token = localStorage.getItem('token')
    if (token) {
      this.props.getUser( this.props.history )
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.userId !== nextProps.userId ? this.props.getExerciseCollection( nextProps.userId ) : null
  }

  render() {
    return (
      <MainContainer />
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    data: state.exercises.data
  }

}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getExercises: fetchExercises,
    getUser: fetchUser,
    getExerciseCollection: getUserExerciseCollection
  }, dispatch)
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) )
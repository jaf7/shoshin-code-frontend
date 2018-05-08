import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Cell } from 'react-md'
import ExerciseCard from './ExerciseCard' 

const style = { display: 'flex', alignItems: 'stretch' }

class ExerciseChooser extends Component {

  render() {
    return (

      <Grid className="exercise-chooser-grid">
        { this.props.exercises.loaded ? this.props.exercises.data.map(exercise => <Cell key={`exercise-card-${exercise.id}`} style={style} size={2}><ExerciseCard exercise={exercise} /></Cell> ) : "Loading"  } 
      </Grid>

    )
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.exercises
  }
}

export default connect( mapStateToProps )( ExerciseChooser )